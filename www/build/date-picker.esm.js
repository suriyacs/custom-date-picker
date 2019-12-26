import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-9a4ba90f.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["date-calendar",[[0,"date-calendar",{"onChange":[16],"inputRef":[16],"year":[32],"month":[32],"selectedDay":[32],"monthDetails":[32]}]]],["date-picker",[[1,"date-picker",{"first":[1],"middle":[1],"last":[1],"showDatePicker":[32]},[[10,"click","addBackDrop"]]]]]], options);
});
