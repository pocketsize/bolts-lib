# Bolts 
*1.0.4*

Bolts is a front-end helper library, consisting of practical Sass mixins and functions, along with a collection of JavaScript functions, helping you deal with all the mundane website building and styling tasks, so that you can focus on creating something new. It aims to be a toolkit that takes care of the things you're tired of doing.

Bolts doesn't output any unnecessary styles, and all JavaScript functions can be loaded separately through ES6+ imports, making its footprint as tiny as possible.

## Installation

### npm

`npm i bolts-lib`

### yarn

`yarn add bolts-lib`

## Sass

### Usage

#### Including Bolts in your Sass files

`@import '~bolts-lib/src/sass/bolts';`

#### Configuration variables

Define any of the following variables before including Bolts to set default options for many of the mixins and functions.

| Variable name                                 | Default value | Example value                                  | Description                                                                                     |
| --------------------------------------------- |-------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| $bolts-reset-focus-styles                     | `false`       | `true`                                        | Removes outline on `:focus` state                                                               |
| $bolts-reset-list-styles                      | `false`       | `true`                                        | Resets `list-style` on all `<ul>` and `<ol>` elements                                           |
| $bolts-reset-legacy-element-styles            | `false`       | `true`                                        | Resets styles on some deprecated elements (such as font, marquee, blink, nobr and more          |
| $bolts-default-sticky-footer-wrapper-selector | `false`       | `'> *:first-child'`                           | Selector for wrapper (content without footer) used by sticky-footer mixin                       |
| $bolts-default-sticky-footer-footer-selector  | `false`       | `'> footer'`                                  | Selector for footer used by sticky-footer mixin                                                 |
| $bolts-default-pseudo                         | `false`       | `before`                                      | Pseudo selector used by aspect-ratio, clear and vertical-align mixins if argument is not passed |
| $bolts-default-font-path                      | `false`       | `'../fonts'`                                  | `$path` used by font mixin if argument is not passed                                            |
| $bolts-default-container-width                | `false`       | `90%`                                         | `$width` used by container mixin if argument is not passed                                      |
| $bolts-default-container-max-width            | `false`       | `1080px`                                      | `$max-width` used by container mixin if argument is not passed                                  |
| $bolts-default-container-align                | `false`       | `center`                                      | '$align' used by container mixin if argument is not passed                                      |
| $bolts-default-inline-layout-align            | `false`       | `top`                                         | `$align` used by inline-layout mixin if argument is not passed                                  |
| $bolts-default-inline-layout-gutters          | `false`       | `20px`                                        | `$gutters` used by inline-layout mixin if argument is not passed                                |
| $bolts-default-flex-layout-align              | `false`       | `top`                                         | `$align` used by flex-layout mixin if argument is not passed                                    |
| $bolts-default-flex-layout-gutters            | `false`       | `20px`                                        | `$gutters` used by flex-layout mixin if argument is not passed                                  |
| $bolts-default-background-image               | `false`       | `'../images/bg.jpg'`                          | `$image` used by background mixin if argument is not passed                                     |
| $bolts-default-background-size                | `false`       | `cover`                                       | `$size` used by backgound mixin if argument is not passed                                       |
| $bolts-default-background-position            | `false`       | `50% 50%`                                     | `$position` used by backgound mixin if argument is not passed                                   |
| $bolts-default-background-repeat              | `false`       | `repeat`                                      | `$repeat` used by backgound mixin if argument is not passed                                     |
| $bolts-default-background-attachment          | `false`       | `fixed`                                       | `$attachment` used by backgound mixin if argument is not passed                                 |
| $bolts-default-background-color               | `false`       | `#ddd`                                        | `$color` used by backgound mixin if argument is not passed                                      |
| $bolts-default-transition-property            | `false`       | `opacity`                                     | `$property` used by transition mixin if argument is not passed                                  |
| $bolts-default-transition-duration            | `false`       | `0.2s`                                        | `$duration` used by transition mixin if argument is not passed                                  |
| $bolts-default-transition-easing              | `false`       | `ease-in-out`                                 | `$easing` used by transition mixin if argument is not passed                                    |
| $bolts-default-transition-delay               | `false`       | `0.1s`                                        | `$delay` used by transition mixin if argument is not passed                                     |
| $bolts-default-transition-queue               | `false`       | `true`                                        | Enables queue with default property on transition mixin unless overwritten                      |
| $bolts-default-transition-queue-property      | `false`       | `visibility`                                  | `$queue` (property) used by transition mixin if argument is not passed                          |
| $bolts-default-transition-queue-duration      | `false`       | `0s`                                          | `$queue-duration` used by transition mixin if argument is not passed                            |
| $bolts-default-transition-queue-easing        | `false`       | `linear`                                      | `$queue-easing` used by transition mixin if argument is not passed                              |
| $bolts-default-auto-col-min                   | `false`       | 1                                             | `$min` (minimum amount of columns) used by auto-col mixin if argument is not passed             |
| $bolts-default-auto-col-max                   | `false`       | 12                                            | `$max` (maximum amount of columns) used by auto-col mixin if argument is not passed             |
| $bolts-default-responsive-font-size-ratio     | `false`       | 1.6                                           | `$ratio` used by responsive-font-size mixin if argument is not passed                           |
| $bolts-breakpoints                            | `false`       | `(medium: 500px)`                             | Breakpoints that can be accessed by the width and height functions when writing media queries   |
| $bolts-selectors                              | `false`       | `(headings: 'h1, h2')`                        | Map containing element collections that can be accessed by the `select` mixin                   |
| $bolts-easings                                | `false`       | `( ease-in-quad: '0.55, 0.085, 0.68, 0.53' )` | Map containing element collections that can be accessed by the `select` mixin                   |

<br>

------------

<br>

## Functions

### Breakpoint

- `width()`
- `width-from()`
- `width-to()`
- `height()`
- `height-from()`
- `height-to()`

Functions to run inside your `@media` queries that lets you access your defined breakpoints. It automatically compensates your pixel values to prevent duplicate properties being set.

<br>

**Usage**:

```scss
.columns {
  @include inline-layout;

  .column {
    @media ( width-to(small) )      { width: 100%; }
    @media ( width(small, medium) ) { width: 50%; }
    @media ( width(medium, large) ) { width: 25%; }
    @media ( width-from(large) )    { width: 12.5%; }
  }
}
```

<br>

**Arguments:**

| Name  | Accepted values                                                | Description                                              |
| ----- | -------------------------------------------------------------- | -------------------------------------------------------- |
| $from | CSS length unit or key name from the `$bolts-breakpoints` map  | Sets the `min-width` or `min-height` in the media query. |
| $to   | CSS length unit or key name from the `$bolts-breakpoints` map  | Sets the `max-width` or `max-height` in the media query. |

<br>

------------

<br>

### Retina

- `retina()`

Function to run in your `@media` queries to target retina screens.

<br>

**Usage**:

```scss
.icon {
  @media ( retina() ) { background-image: url('icon@2x.jpg'); }
}
```

<br>

------------

<br>

### Easings

- `ease()`

Returns a cubic-bezier with the specified easing.
If a named easing if supplied, it looks for easings defined in $bolts-easings, otherwise the supplied value is used directly.

| Name    | Accepted values                                                                     | Description     |
| ------- | ----------------------------------------------------------------------------------- | --------------- |
| $easing | CSS standard named easings, cubic-bezier, or key name from the `$bolts-easings` map | Desired easing  |

<br>

------------

<br>

## Mixins

### Reset

- `reset`

*This mixin currently has no description*


**Usage:**

```scss
// This mixin currently has no example
```


**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Sticky footer

- `sticky-footer()`

*This mixin currently has no description*

**Usage:**

```scss
.page {
  @include sticky-footer(
    '.page-wrapper',
    '.page-footer'
  );
}
```

**Arguments:**

| Name              | Accepted values | Default value | Description |
| ----------------- | ----------------| ------------- | ----------- |
| $wrapper-selector | -               | -             | -           |
| $footer-selector  | -               | -             | -           |


<br>


### Fonts

- `font()`

Simpler declaration of `@font-face`s (include this before any output, including the reset and boilerplate).

**Usage**:

```scss
@include font(
  $family:   FontAwesome,
  $filename: fontawesome-webfont,
  $formats:  ( eot, woff2, woff, ttf, svg ),
  $svg-id:   fontawesomeregular
);

@include font(
  $family: 'Lato',
  $formats: ( woff ),
  $variations: (
    ( filename: 'Lato-Regular' ),
    ( filename: 'Lato-Italic', style: italic ),
    ( filename: 'Lato-Bold', weight: 700 ),
    ( filename: 'Lato-BoldItalic', weight: 700, style: italic )
  )
)
```

**Arguments:**

| Name        | Example values                                                     | Description                                                                                                              |
| ----------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| $family     | `'Lato'`                                                           | Font family name                                                                                                         |
| $weight     | `400`                                                              | `font-weight`                                                                                                            |
| $style      | `normal`                                                           | `font-style`                                                                                                             |
| $filename   | `Lato-Regular`                                                     | Font filename without extension                                                                                          |
| $formats    | `(ttf, otf, woff, woff2, svg)`                                     | List of the available formats of your font                                                                               |
| $path       | `'../fonts'`                                                       | Defaults to `$bolts-font-path`                                                                                           |
| $svg-id     | `latoregular`                                                      | Defaults to filename                                                                                                     |
| $variations | `( (filename: Lato-Regular), (filename: Lato-Bold, weight: 700) )` | List of maps with font variations. You only need to enter the properties that deviate from the defaults.                 |


<br>


### Responsive font size

- `responsive-font-size()`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name   | Accepted values | Default value | Description |
| ------ | ----------------| ------------- | ----------- |
| $ratio | -               | -             | -           |
| $min   | -               | -             | -           |
| $max   | -               | -             | -           |


<br>


### Container

- `container()`

Sets basic container styling on element.

**Usage:**

```scss
.page {
  .page-inner {
    @include container(90%, 1080px);
  }
}
```

**Arguments:**

| Name        | Accepted values                   | Default value                                 | Description                                           |
| ----------- | --------------------------------- | --------------------------------------------  | ----------------------------------------------------- |
| $width      | CSS length unit                   | Value of `$bolts-default-container-width`     | Width of container                                    |
| $max-width  | CSS length unit                   | Value of `$bolts-default-container-max-width` | Max width of container                                |
| align       | `left`, `center`, `right`         | Value of `$bolts-default-container-align`     | Container alignment                                   |


<br>


### Clearing whitespace

- `clear-whitespace()`

Eliminates the space between `inline-block` elements using `font-size: 0`.

**Usage:**

```scss
.header {
  @include clear-whitespace($font-size: 12px);

  .header-logo {
    display: inline-block;
    width: 120px;
    height: 60px;
  }
}
```

**Arguments:**

| Name       | Accepted values | Default value | Description                                         |
| ---------- | --------------- | ------------- |  -------------------------------------------------- |
| $font-size | CSS length unit | `1rem`        | Font size to reset child elements to (can't use em) |


<br>


### Overlay

- `overlay()`

*This mixin currently has no description*

**Usage:**

```scss
.hero {
    position relative;
    height: 100vh;

    &:before {
        content: '';
        @include overlay;
        background-color: rgba(black, 0.5);
    }
}
```

**Arguments:**

| Name         | Accepted values | Description                                                       |
| ------------ | --------------- | ----------------------------------------------------------------- |
| $force-size  | Bool            | sets width and height to 100% (necessary when applied to iframes) |


<br>


### Backgrounds

- `background()`

*This mixin currently has no description*

**Usage:**

```scss
.icon {
  @include background(
    '../images/icon.png',
    $size: contain,
    $position: 50% 50%
  );
  width: 40px;
  height: 40px;
}
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Transitions

- `transition()`

Sets transition with pre set vales for duration and easing. Second argument queues a second transition after the initial transition is done.

**Usage:**

```scss
.button {
    background-color: black;
    @include transition(background-color);

    &:hover {
      background-color: red;
    }
}
```

**Usage with $queue:**

```scss
.header-icon {
    visibility: hidden;
    opacity: 0;
    @include transition(opacity, $queue: visibility);

    @include state('menu-open') {
      visibility: visible;
      opacity: 1;
      @include transition(opacity);
    }
}
```

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Transition height

- `transition-height()`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Element aspect ratio

- `aspect-ratio()`

Set an aspect ratio for a block element.

**Usage:**

```scss
.hero {
  @include background('../images/background.jpg');
  @include aspect-ratio(16, 9);
}
```

**Arguments:**

| Name         | Accepted values | Description                                        |
| ------------ | --------------- | -------------------------------------------------- |
| $x           | Number          | What width value to base the ratio calculation on  |
| $y           | Number          | What height value to base the ratio calculation on |


<br>


### Classic clearfix

- `clear()`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Element centering

- `center()`

Center an element inside it's closest relatively positioned parent in either, or both direction (vertical/horizontal)

> **Known issue:** Some browsers positions the element "between pixels", making it appear blurred. Use `transform-style: preserve-3d` on the parent to avoid this. 

**Usage:**

```scss
.hero {
  position: relative;

  .hero-text {
    @include center(vertical);
    left: 0;
    right: 0;
  }
}
```

**Arguments:**

| Name         | Accepted values                  | Default value | Description                        |
| ------------ | -------------------------------- | ------------- | ---------------------------------- |
| $direction   | `both`, `vertical`, `horizontal` | `both`        | What axis to center the element on |


<br>


### Vertical alignment

- `vertical-align()`

*This mixin currently has no description*

**Usage:**

```scss
.hero {
  @include vertical-align(middle);
  min-height: 100vh;
  text-align: center;

  .hero-inner {
    width: 90%;
    max-width: 1080px;
    text-align: left;

    .hero-title {
      @extend %title-large;
    }

    .hero-subtitle {
      @extend %title-medium;
    }
  }
}
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Antialiasing

- `antialias()`

*This mixin currently has no description*

**Usage:**

```scss
.hero-text {
  color: white;
  @include antialias;
}
```

**Arguments:**

| Name    | Accepted values       | Description                                                                  |
| ------- | --------------------- | ---------------------------------------------------------------------------- |
| $method | default, none, reset  | Sets font smoothing (webkit and moz-osx), defaults to antialiased/grayscale  |


<br>


### Elastic scroll

- `scroll()`

*This mixin currently has no description*

**Usage:**

```scss
.modal-inner {
  @include scroll;
}
```


<br>


### Grayscale

- `grayscale()`

*This mixin currently has no description*

**Usage:**

```scss
.photo {
  @include transition(filter -webkit-filter);

  &:hover {
    @include grayscale;
  }
}
```


<br>


### Layouting with inline blocks

- `inline-layout()`
- `inline-row()`
- `inline-column()`

The inline-layout component is another take on layouts, where the columns are `inline-block` elements, which eliminates the need for rows, and makes them respond to text-align. This is especially useful for dynamic content.

**Usage:**

HTML

```html
<div class="items">
  <div class="item is-small"></div>
  <div class="item is-medium"></div>
  <div class="item is-small"></div>
  <div class="item is-large"></div>
  <div class="item is-small"></div>
</div>
```

SCSS

```scss
.items {
  @include inline-layout;

  .item {
    @media ( width-to(medium) ) {
      &.is-small { width: 50%; }
      &.is-medium, &.is-large { width: 100%; }
    }

    @media ( width-from(medium) ) {
      &.is-small  { width: 25%; }
      &.is-medium { width: 50%; }
      &.is-large  { width: 75%; }
    }
  }
}
```

**Arguments:**

| Name     | Accepted values                   | Default value | Description            |
| -------- | --------------------------------- | ------------  | ---------------------- |
| $gutters | CSS length unit                   | `0`           | Size of gutters        |
| $col     | String                            | `'> *'`       | Selector used to find a direct descendant column element |



<br>


### Layouting with flex

- `flex-layout()`
- `flex-row()`
- `flex-column()`


*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

<br>

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Stagger delays

- `stagger-delay()`

Gives every selected element an increased delay based on its order in the DOM. Example usage is for making cascading transitions and animations.

**Usage**:

```scss
.menu.is-open {

  .menu-item {
    transform: translateX(-50px);
    transition: transform 300ms ease;

    @include stagger-delay(
      $increment:  50ms,
      $iterations: 10
    );
  }
}
```
 
**Arguments:**
 
| Name         | Accepted values            | Default value | Description                                                                                    |
| ------------ | -------------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| $type        | `transition`, `animation`  | `transition`  | Specifies if the mixin outputs `transition-delay`or `animation-delay`.                         |
| $start       | CSS time unit              | `0s`          | Add a delay before the incremantal-delay starts.                                               |
| $increment   | CSS time unit              | `0s`          | The amount of time incremented for each item.                                                  |
| $iterations  | Number                     | `0`           | Amount of iterations to output. This is needed since Sass doesn't have access to the DOM.      |
| $modifier    | Number                     | `0`           | A modifier to create non-linear iterations. General sweetspot is somewhere between 1 and 2.    |
| $direction   | `forwards`, `backwards`    | `forwards`    | Specifies if the delay should be added from the beginning or the end of the selected elements. |


<br>


### Auto columns

- `auto-col()`

Sets widths to dynamically fit all columns in one row

**Usage:**

```scss
.columns {
  @include inline-layout;

  .column {
    // 5 columns = width: 20%
    // 2 columns = width: 50%
    @include auto-col;
  }
}
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Reversing columns

- `reverse()`

Reverse the order of an element's children without the need for duplicate markup.

**Usage:**

```scss
.items {
  @include inline-layout;

  .item { width: 25%; }

  @media ( width-to(medium) ) {
    @include reverse;
  }
}
```


<br>


### States

- `state()`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Selecting elements

- `select()`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Styling input placeholders

- `placeholder()`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Select elements of a given amount

- `count()`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Selector mathing a resizing window

- `resizing()`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Match image orientation

- `orientation()`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>


### Hover

- `hover`
- `no-hover`

*This mixin currently has no description*

**Usage:**

```scss
// This mixin currently has no example
```

**Arguments:**

| Name | Accepted values | Default value | Description |
| ---- | ----------------| ------------- | ----------- |
| -    | -               | -             | -           |


<br>

------------

<br>

## JavaScript

### Setup

*JavaScript setup currently has no documentation.*

### Functions

*Javascript functionality currently has no documentation*
