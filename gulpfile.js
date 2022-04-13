const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssValidator = require(`gulp-stylelint`),
    cssCompressor = require(`gulp-clean-css`),
    jsValidator = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    babel = require(`gulp-babel`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let validateHTML = () => {
    return src([`dev/html/*.html`,`dev/html/**/*.html`])
        .pipe(htmlValidator(undefined));
};

let compressHTML = () => {
    return src([`dev/html/*.html`,`dev/html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let validateCSS = () => {
    return src([`dev/css/style.css`,`dev/css/**/style.css`])
    .pipe(cssValidator({
        failAfterError: false,
        reporters: [
          {formatter: `string`, console: true}
        ]
}));
};

let compressCSS = () => {
   return src([`dev/css/style.css`,`dev/css/**/style.css`])
    .pipe(cssCompressor({compatibility: `ie8`}))
    .pipe(dest(`prod`));
};

let validateJS = () => {
    return src(`dev/js/**/*.js`)
        .pipe(jsValidator())
        .pipe(jsValidator.formatEach(`compact`));
};

let transpileJSForDev = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
    return src(`dev/js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `dev`,
                `dev/html`
            ]
        }
    });
 watch(`dev/html/*.html`, validateHTML).on(`change`, reload);
 watch(`dev/css/*.css`, validateCSS).on(`change`, reload);
 watch(`dev/js/*.js`, series(validateJS, transpileJSForDev)).on(`change`, reload);
};

let browserChoice = `default`;

async function brave () {
    browserChoice = `brave browser`;
}

async function chrome () {
    browserChoice = `google chrome`;
}

async function firefox () {
    browserChoice = `firefox`;
}

async function opera () {
    browserChoice = `opera`;
}

async function safari () {
    browserChoice = `safari`;
}

async function allBrowsers () {
    browserChoice = [
        `brave browser`,
        `google chrome`,
        `firefox`,
        `opera`,
        `safari`,
    ];
}

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.validateCSS = validateCSS;
exports.compressCSS = compressCSS;
exports.validateJS = validateJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.serve = series(
    validateHTML,
    validateCSS,
    validateJS,
    transpileJSForDev,
    serve
);
exports.build = series(
    validateHTML,
    validateCSS,
    compressHTML,
    compressCSS,
    validateJS,
    transpileJSForProd
);
exports.brave = series(brave, serve);
exports.chrome = series(chrome, serve);
exports.firefox = series(firefox, serve);
exports.opera = series(opera, serve);
exports.safari = series(safari, serve);
exports.allBrowsers = series(allBrowsers, serve);