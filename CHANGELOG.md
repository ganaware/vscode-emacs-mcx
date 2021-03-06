# Change Log
All notable changes to the "emacs-mcx" extension will be documented in this file.

## [Unreleased]
- Improvements of kill-ring
    - to make the maximum length of kill ring configurable
    - to make it configurable to turn on and off kill-ring integration with clipboard
    - to browse kill-ring contents
- To support more kinds of kill command
    - `M-d`: (kill-word)
    - `M-DEL`: ((backward-kill-word)
    - `C-x DEL`: (backward-kill-sentence)
    - `M-k`: (kill-sentence)
    - `C-M-k`: (kill-sexp)  # Maybe ignored
    - `M-z char`: (zap-to-char)  # Maybe ignored
- To support prefix argument with
    - `kill-line`
    - etc
- Improvement of `emacs-mcx.transformTo(Upper|Lower)case` to handle the mixture of empty and non-empty selections.

## [0.8.0] - 2019-02-17
### Added
- `C-h` (delete-backward-char) and `C-d` (delete-forward-char) now support prefix argument.

## [0.7.0] - 2019-02-15
### Added
- `C-k` (kill-line) now supports prefix argument.

### Fixed
-  Behaviors of `C-f` (forward-char) and `C-b` (backward-char) are modified to move cursors over multiple lines when prefix argument specified.

## [0.6.0] - 2019-02-13
### Added
- Run CI on Windows
- Sexp navigations with mark-mode compatibility
    - A dependency to an external extension `haruhi-s.sexp` is eliminated.

## [0.5.0] - 2019-02-12
### Added
- `C-u` (universal-argument) is implemented.
- Prefix argument is supported with single character inputs and movement commands.

## [0.4.0] - 2019-01-23
### Added
- A `when` clause context `emacs-mcx.inMarkMode` is supported.

## [0.3.0] - 2019-01-20
### Added
- `C-x C-o` (delete-blank-lines)

## [0.2.0] - 2019-01-20
### Added
- `emacs-mcx.transformTo(Upper|Lower)case` are implemented and assigned to `M-u`, `C-x C-u` and `M-l`, `C-x C-l` respectively. However, the current implementation has a drawback in the case there are multiple cursors and empty and non-empty selections are mixed.

## [0.1.5] - 2019-01-18
### Fixed
- status bar messages disappear when other operations are invoked (or 10 seconds after they appear).

## [0.1.4] - 2019-01-14
### Fixed
- Fix `ESC` not to override existent necessary keybindings
- Fix yank-pop to show a status bar message if invoked not after yank

## [0.1.3] - 2019-01-14
### Added
- `C-l` (recenter-top-bottom) (#40)
- To support `M-l` (downcase-word) and `M-u` (upcase-word) (#23)

### Fixed
- `C-g` (`ESC`) cancels continuous kill (#42)

## [0.1.2] - 2019-01-13
### Added
- New kill-ring and yank implementation to append continuous invokation of `C-k` (kill-line) (#26).
- Add sexp functionalities by importing [`haruhi-s.sexp`](https://marketplace.visualstudio.com/items?itemName=haruhi-s.sexp) (#27).

## [0.1.1] - 2019-01-12
### Added
- New keybinding `ESC` for cancel (`quit`) (#30).
- New keybinding `M-g M-g` for `goto-line` (#24).
- New keybinding `M-g M-n` and `M-g M-p` for `next-error` and `previous-error` respectively (#25).
- New keybinding `C-o` for `open-line` (#28).
- Improve mark-mode behavior with `C-M-n` (#29).
