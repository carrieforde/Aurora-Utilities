# Aurora Utilities

Sass and JavaScript utilities for all your front end projects.

## Features

This package is collection of helpful Sass utilities that keep you focused on building new features instead of recreating the wheel over and over.

The Sass included in this package only outputs what you use, so there is no need to worry adding bloat to your project.

### Sass

Aurora Utilities comes bundled with a set of helpful Sass functions and mixins that makes writing styles a breeze.

## Installation

Add Aurora Utilities as a project dependency:

```sh
npm install --save-dev aurora-utilities
```

### Sass Usage

1.  For Sass use, you'll need to add Aurora Utilities to your node-sass `includePaths`:

    **Webpack example using `sass-loader`:**

    ```js
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
        includePaths: [
          'aurora-utilities',
        ],
        }
        sourceMap: true
      }
    }
    ```

    **Gulp example using `gulp-sass`:**

    ```js
    gulp.task('sass', function() {
      return gulp.
        .pipe(sass( {
          includePaths: [
            'node_modules/aurora-utilities/sass',
            'node_modules/sanitize.scss'
          ]
        }))
    });
    ```

2.  Import `aurora-utilities` into your main sass file:

    ```scss
    @import 'aurora-utilities';
    ```

3.  Use the bundled functions and mixins as required:

    ```scss
    .link {
      @include link($primary, $accent);
      @include decorative-link('\u007');
    }
    ```
