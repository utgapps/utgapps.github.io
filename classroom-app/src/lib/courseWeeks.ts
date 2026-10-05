// A course week as a project a student can open.
//
// Each course publishes its weeks in milestones.json, in the form its own
// pages print them. For AI101 and CS701 that already is a project: the files
// are index.html or HelloWorld.java. PXP101 is written for PixelPad, where a
// game is code panels called "Monster loop" and the rooms and pictures live
// outside the code. Copied across as they were, those panels were refused by
// the API - a file name may not hold a space - and would have opened in the
// web editor if they had not been, because the kind was guessed from the file
// endings and nothing there ends in .java.

import { GAME_KIND, MANIFEST_FILE, type ProjectKind } from "./types";

export type CourseWeek = { n: number; title: string; kind: ProjectKind; files: Record<string, string> };

/** Picture name -> [colour, width, height], as the course draws them. */
export type CourseSprites = Record<string, [string, number, number]>;

/** "Monster loop" -> "Monster.loop.py", the editor's name for the same panel. */
const PIXELPAD_PANEL = /^([A-Za-z][A-Za-z0-9_]*) (start|loop)$/;

/** One week of PixelPad panels as a game project: each panel under the
 *  editor's file name, and a game.txt listing the rooms the week has reached
 *  and the pictures its code asks for. A room is listed only once a panel
 *  for it exists - GameOver arrives in week 10 - because a listed room with
 *  nothing in it is something the editor reports as broken. */
export function gameFromPanels(panels: Record<string, string>, rooms: string[], sprites: CourseSprites): Record<string, string> {
  const files: Record<string, string> = {};
  for (const [name, code] of Object.entries(panels)) {
    const match = PIXELPAD_PANEL.exec(name);
    files[match ? `${match[1]}.${match[2]}.py` : name] = code;
  }
  const allCode = Object.values(panels).join("\n");
  const manifest = [
    ...rooms.filter((room) => `${room} start` in panels || `${room} loop` in panels).map((room) => `room ${room}`),
    ...Object.entries(sprites).filter(([picture]) => allCode.includes(picture))
      .map(([picture, [colour, width, height]]) => `sprite ${picture} ${colour} ${width} ${height}`),
  ];
  files[MANIFEST_FILE] = manifest.join("\n") + "\n";
  return files;
}

/** A course's milestones.json as weeks ready to copy into a project. */
export function weeksFromMilestones(data: unknown): CourseWeek[] {
  const course = (data || {}) as { kind?: unknown; rooms?: unknown; sprites?: unknown; weeks?: unknown };
  if (!Array.isArray(course.weeks)) return [];
  const weeks = course.weeks as { n: number; title: string; files: Record<string, string> }[];
  if (course.kind === GAME_KIND) {
    const rooms = Array.isArray(course.rooms) ? course.rooms as string[] : [];
    const sprites = (course.sprites || {}) as CourseSprites;
    return weeks.map((week) => ({ ...week, kind: GAME_KIND, files: gameFromPanels(week.files, rooms, sprites) }));
  }
  /* CS701's .java files are Java, everything else so far is a web page.
     Guessing "web" for a Java week would open it in the web editor with a
     preview that can only ever be blank. */
  return weeks.map((week) => ({
    ...week,
    kind: Object.keys(week.files).some((name) => name.endsWith(".java")) ? "java" : "web",
  }));
}
