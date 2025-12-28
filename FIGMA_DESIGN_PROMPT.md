# Figma Design Prompt - Progress Visualization Alternatives

## Context
I'm designing a resource tracking dashboard for Dubai AI. Currently, each stage shows a progress bar with percentage (0-100%), but stages are actually status-based (Done, Active, Critical, Not Started) rather than truly percentage-based. This creates a misleading representation.

## Current Design
- **Layout**: Vertical list of stages
- **Each Stage Shows**:
  - Stage name
  - Progress bar (0-100%) - **THIS NEEDS TO CHANGE**
  - Status icon (checkmark, clock, alert)
  - ETA date
  - Actual date
  - Notes field
- **Color Scheme**: Dark theme (slate-900 background, slate-100 text)
- **Status Colors**:
  - Done: Green (#10b981)
  - Active: Blue (#3b82f6)
  - Critical: Red (#ef4444)
  - Not Started: Gray (#6b7280)

## Design Requirements

### Create 3-5 alternative designs that replace the percentage progress bar with:

1. **Status Badge System**
   - Large, prominent status badge (Done/Active/Critical/Not Started)
   - Color-coded with icons
   - Clear status text
   - Maintains ETA/Actual dates and notes

2. **Timeline/Stepper View**
   - Horizontal timeline showing stage sequence
   - Connected steps with status indicators
   - Shows progression through stages
   - Works for linear workflows

3. **Status Card Design**
   - Card-based layout with colored left border
   - Status badge + icon at top
   - ETA/Actual dates prominently displayed
   - Notes section clearly visible

4. **Hybrid Badge + Mini Indicator**
   - Status badge (primary)
   - Small visual indicator showing completion (not percentage)
   - Could show "X of Y tasks" or similar
   - Maintains progress feeling without misleading percentage

5. **Kanban-Style Status Columns** (Optional)
   - Group stages by status in columns
   - Drag-and-drop feel (visual only)
   - Shows workflow state clearly

## Design Constraints

### Must Maintain:
- ✅ Dark theme (slate-900 background)
- ✅ All existing information (name, ETA, actual, notes, dependencies)
- ✅ Status colors (green, blue, red, gray)
- ✅ Responsive design considerations
- ✅ Accessibility (colorblind-friendly)

### Design Principles:
- **Clarity**: Status should be immediately obvious
- **Accuracy**: No misleading progress indicators
- **Visual Hierarchy**: Important info (status, dates) should stand out
- **Consistency**: All stages should follow same pattern
- **Professional**: Enterprise/project management tool aesthetic

## Technical Context
- **Framework**: React with inline styles
- **Icons**: Lucide React icon library
- **Layout**: Sidebar navigation + main content area
- **Screen Size**: Desktop-first, but should work on tablet

## Deliverables Needed

For each design option, please provide:

1. **Main Stage List View**
   - How stages appear in the list
   - Status representation
   - Information hierarchy

2. **Individual Stage Card/Component**
   - Detailed view of one stage
   - All information visible
   - Interaction states (hover, edit mode)

3. **Status Variations**
   - Show same design with different statuses:
     - Done stage
     - Active stage
     - Critical/Blocked stage
     - Not Started stage

4. **Mobile/Tablet Considerations**
   - How design adapts to smaller screens
   - Touch-friendly interactions

5. **Color Palette**
   - Exact hex codes for each status
   - Background colors
   - Text colors
   - Border/divider colors

## Specific Questions to Address

1. How do we show "progress" without using misleading percentages?
2. Should we show completion count (e.g., "8 of 12 tasks done")?
3. How do we indicate stages that are "in progress" vs "blocked"?
4. Should ETA/Actual dates be more prominent?
5. How do we handle stages with dependencies visually?
6. Should there be a summary view showing overall progress?

## Inspiration References
- Linear (issue tracking)
- Jira (project management)
- Notion (task management)
- GitHub Projects (kanban boards)
- Monday.com (status columns)

## Output Format
Please provide:
- Figma design file with all variations
- Component breakdown
- Style guide with colors/spacing
- Interaction states
- Responsive breakpoints

---

## Prompt for Figma AI/Copilot

```
Design 3-5 alternative UI components for displaying project stage status in a dark-themed dashboard. 
Replace misleading percentage progress bars with accurate status-based visualizations.

Requirements:
- Dark theme (slate-900 background)
- Status types: Done (green), Active (blue), Critical (red), Not Started (gray)
- Must show: Stage name, ETA date, Actual date, Notes
- Desktop-first, responsive
- Professional enterprise aesthetic

Create variations:
1. Status badge system with icons
2. Timeline/stepper view
3. Status card with colored border
4. Hybrid badge + mini indicator
5. Kanban-style columns

For each, show: main list view, individual stage component, all status variations, mobile adaptation.
Include color palette, spacing, typography, and interaction states.
```

