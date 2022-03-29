# Changelog
All changes following 1.0.0 will be documented within this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## Unreleased

## [1.1.1] - 2022-03-28

### Added

- Character banner at the beggining of the page.


## Released

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