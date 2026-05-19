# Styling Fix - Scrollbar Removal

## Issue
The CardDemo web application had an unwanted scrollbar appearing in the mainframe terminal display, which was inconsistent with the authentic mainframe terminal look and feel.

## Root Cause
The `.screen-body` CSS class had `overflow-y: auto` set, which allowed vertical scrolling when content exceeded the fixed 24-line terminal height. This created a visible scrollbar that broke the immersive mainframe experience.

## Solution
Changed the `.screen-body` overflow property from `auto` to `hidden` to maintain the authentic 80x24 character terminal display without scrollbars.

### Changes Made

1. **mainframe.css (line 51)**
   - Changed: `overflow-y: auto;`
   - To: `overflow: hidden;`

2. **mainframe.css (lines 311-327)**
   - Removed scrollbar styling rules (`::-webkit-scrollbar`, etc.)
   - Added comment explaining why scrollbar styling was removed

## Result
- The terminal now displays with a fixed 80x24 character grid
- No scrollbars appear, maintaining authentic mainframe terminal aesthetics
- Content is constrained to the visible terminal area
- Green screen look and feel is preserved without visual inconsistencies

## Testing
Open `carddemo-web/index.html` in a browser and verify:
- No scrollbar appears in the terminal window
- The terminal maintains its fixed dimensions
- The green screen aesthetic is consistent throughout
- All screens fit within the 80x24 character display

## Date
2026-05-13