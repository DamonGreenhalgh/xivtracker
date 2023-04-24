# Changelog

All changes following 1.0.0 will be documented within this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## Unreleased

## Released

## [1.3.0] - 2023-04-24

Compare system, updated character page layout and support for **Final Fantasy XIV** patch **6.2** '_Buried Memory_' and patch **6.3** '_Gods Revel Lands Tremble_'.

### Added

- Added compare side panel to allow users to compare their characters with other players. Currently supports comparing attributes, jobs and equipment.
- Added collection type to collection tool tips.
- Added notice for when error events occur.
- Added more detailed materia information on item tool tips.
- Added search bar to achievements and collections.
- Added friends and free company panels.
- Added an easy to use reference button on character pages.
- Added average item level indicator to character banner.
- Added support for **Final Fantasy XIV** patch **6.2** '_Buried Memory_' and patch **6.3** '_Gods Revel Lands Tremble_' .

### Changes

- Changed search bar to dynamically search for characters as soon as the user has interacted with the component.
- Changed server selection for better ease of use.
- Overhauled character page layout.
- Changed loading image.
- Changed completion representation to give more detailed information.
- Updated light theme.

## [1.2.2] - 2022-06-26

This update focuses on polishing up existing features and fixing bugs.

### Added

- Added help section for finding the **Lodestone ID** of a character.
- Added the ability to remove the current reference character.
- Added default profile icon when no reference character has been allocated.

### Changes

- Changed directory structure.
- Changed multiple component styles.
- Changed the description of the reference character system for improved clarity.
- Updated most components to use prop destructuring for better readability.
- Updated `alt` text of `img` tags to be more descriptive.
- Updated light theme.

### Fixed

- Fixed title not changing to **XIV Tracker |** `<Character Name>` when viewing character profile.
- Fixed _Newfound Adventure_ quest component displaying incorrect tooltip.
- Fixed app crashing when viewing a character with unknown collection status.

## [1.2.1] - 2022-05-08

Moved from **Github Pages** to **AWS Amplify** as pages has problems with single page web applications. Maintainability update.

### Added

- Added **Help** page.
- Added links to profession jobs.
- Added `useFetchData` custom hook, replaces the `useEffect` nested async function pattern.
- Added media queries for multiple components to improve responsiveness.

### Changes

- Changed most links to now open in a new tab.
- Only valid events are displayed given the date.
- Quests system refactor. Improved maintainability and reduced overhead.

### Fixed

- Fixed quests not appearing when reference character data was not updating.
- Fixed **404 error** when using the search-bar from a character page.
- Fixed **_open in new tab_** resulting in a **404 error**.

## [1.2.0] - 2022-04-16

This release contains various new features and support for **Final Fantasy XIV** patch **6.1** '_Newfound Adventure_'.

### Added

- Added **Reference** feature. Users can select a character to reference. The following features can be applied with a valid reference character.
  - **_Safe Mode_** - hide activities that the reference character has not yet completed.
  - **_Background Parody_** - automatically select the appropriate background based on the reference character's progress in the story.
- Added **Achievements** feature. Displays all achievements aquired by a character.
- Added **Completion** metric to mounts, minions, job and achievements.
- Added multiple **Splash Art** backgrounds to customize the appearance of the app.
- Reintroduced **Profile** feature.
- Added **OCE** servers to server list.
- Added content support for **Final Fantasy XIV** patch **6.1** '_Newfound Adventure_'. New entries have been added to the **Quests** section.
- Added content support for current live events.

### Changed

- Changed **Tooltips** to now display _item level, main stats_ and _bonuses_.
- Changed **Profile Display** to now include currently _active job, experience_ and _level_.
- Changed **Jobs** to show _current/max_ experience points.
- Changed **Page Layout**. Instead of a single page, content is contained within panels.
- Changed **Featured** to now display time relevant content (duration/release date)

### Fixed

- Fixed completion bars being full when at 0% completion.
- Fixed page not loading to a new character when selected from the recent panel while on the character page.
- Fixed job level text not displaying the correct colour when at max level.
- Fixed splash element extending beyond the page.

## [1.1.0] - 2022-03-29

### Added

- **Themes**, with support for more themes in the future.
- **Light Theme** (new default)
- Settings page, currently only has the option to change theme.
- **Glamour** icon indicator on items with a glamour plate applied.
- Added splash image on homepage, random selection.
- Added **Featured** slideshow on homepage.
- Added **Recent** panel below search bar. Displays the 6 last characters viewed on the browser.
- Use of `localStorage` to remember themes, and recent characters over sessions.
- Support for **Mobile** view.

### Changed

- Replaced many icon assets with icons from the `react-icons` library.
- Updated navbar, no longer displays avatar of current character.
- Replaced default `<select>` html tag with custom class.
- Introduction of utility classes. Overhaul on many CSS classes.
- Updated quests section.

### Removed

- Many assets now rendered obsolete with the use of `react-icons` library.
- Obsolete CSS classes.
