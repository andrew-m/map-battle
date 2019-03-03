# Map Battle

Map Grid Reference and compass bearing game.

When playing Mark's map reading tank battle game on paper maps with physical compasses, this game helps the game controller keep track of pieces, and calculate shots and hits.

#### dev plan/steps/progress
✓1. Keep track of team locations on the grid - and display them for the leader coordinating the game.
✓   - Should be in OS grid references, from South West corner, Eastings, then Northings.
✓   - Start with fixed number of teams (4), and fixed starting locations (corners).
✓   - Start with fixed sized grid.
✓* Need to capture inputs in a nice way, at setup time, or at the end of turns.
✓2. Allow teams to move, in 4 figure version, adjacent or diagonal squares.
✓3. Indicate which team is current turn.
✓3. Indicate location at start of term (ie - how far has it moved).
✓3. Allow teams to set start locations
✓3. Prevent teams moving off the grid
✓3. Configure size of grid
✓3. Apply colours to user created teams.
3. Publish as website as well as Electron app. - 
    - in branch "spike-browserify-using-browserify"
3. Allow teams to fire at a bearing. Draw this line on the display (Use game space not canvas space)
3. Fix bug - all teams say "1" on canvas.
3. Style to make canvas take up more screen space.
3. Style movement buttons into square for touchscreens
3. Style with media Queries to work on mobile with efficient use of screen space.
    viewport stuff - https://stackoverflow.com/questions/20590239/maintain-aspect-ratio-of-div-but-fill-screen-width-and-height-in-css
    Landscape or portrait
    Buttons below or buttons beside (or buttons hidden? toggle button?)
3. Prevent teams starting outside grid
3. Annotate the grid lines with their numeric values.
    (may need some margin around the grid.)
3. Configure grid/map offset (ie, non zero corner coordinates)
4. Calculate [line/circle collision](http://www.jeffreythompson.org/collision-detection/line-circle.php)
5. Keep track of hits/lives.

##### possible ideas for future versions
6. 6 figure grid references.
7. Allow movement on a bearing, for a distance (1km). Position to the nearest 6 figure reference.
8. Allow "elevation" or distance of shots. (Seems probably on the tricky side.)
9. Allow changing size of team locations.

### Install dependencies
npm install
### Run the app
npm start

##Resources
A good guide to [reading grid squares and grid references from Ordnance Survey](https://getoutside.ordnancesurvey.co.uk/guides/beginners-guide-to-grid-references/)

Another OS guide, this time to [using a compass](https://getoutside.ordnancesurvey.co.uk/guides/beginners-guide-to-using-a-compass/)
```
Copyright 2019 Andrew Maddison

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
