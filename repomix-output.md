This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose

This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format

The content is organized as follows:

1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
   a. A header with the file path (## File: path/to/file)
   b. The full contents of the file in a code block

## Usage Guidelines

- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes

- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure

```
public/
  icon/
    d_2.svg
    d_3.svg
    divider.png
    footerDivider.svg
    footerField.svg
    footerFieldMobile.svg
    Frame 1618868493.png
    Frame 1618868496.png
    glassCup.png
    I_1.svg
    I_2.svg
    I_3.svg
    I_4.svg
    I_5.svg
    I_6.svg
    I_7.svg
    line.svg
    line2.png
    p_1.png
    p_1.svg
    p_2.png
    p_2.svg
    p_3.svg
    sideDrink.jpg
    sideDrink.png
    sideDrink.svg
    sideGlass.png
    wineglass.svg
  favicon.svg
  icons.svg
src/
  assets/
    hero.png
    react.svg
    vite.svg
  components/
    common/
      BackToTop.tsx
      CartDrawer.tsx
      Container.tsx
      Footer.tsx
      Hero.tsx
      Navbar.tsx
      NavSearch.tsx
      ProductCard.tsx
      TitleDecoration.tsx
    home/
      AboutSection.tsx
      BestSellers.tsx
      BrandBanner.tsx
      CategoryGrid.tsx
      ContactSection.tsx
      FaqSection.tsx
      Hero.tsx
      Home.tsx
      IconicBrands.tsx
      RoseiyDifference.tsx
      SignatureSelections.tsx
      TestimonialsSection.tsx
    shop/
      Shop.tsx
    ui/
      accordion.tsx
      button.tsx
      card.tsx
      dialog.tsx
      dropdown-menu.tsx
      input.tsx
      sheet.tsx
      sonner.tsx
      table.tsx
  config/
    apiClient.ts
    queryClient.ts
    types.ts
  layouts/
    DashboardLayout.tsx
    PublicLayout.tsx
  lib/
    site_data.ts
    utils.ts
  routes/
    guards.tsx
    index.tsx
  App.tsx
  index.css
  main.tsx
.gitignore
.repomixignore
components.json
eslint.config.js
index.html
package.json
README.md
repomix.config.json
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

# Files

## File: src/components/common/Hero.tsx

```typescript
import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative w-full min-h-[85vh] lg:min-h-screen bg-black-900 flex items-center justify-center overflow-hidden pt-28 md:pt-36 pb-20">
            {/* Background Texture & Golden Hills Illustration Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Dark Marble/Grain Overlay Background */}
                <div className="absolute inset-0 bg-[url('/icon/hero-bg-texture.png')] bg-cover bg-center opacity-40 mix-blend-overlay" />

                {/* Bottom Golden Fields / Rolling Dunes Asset */}
                <img
                    src="/icon/hero-golden-hills.png"
                    alt="Golden landscape"
                    className="absolute bottom-0 left-0 w-full h-auto max-h-[50vh] object-cover object-top opacity-90"
                />

                {/* Dark Vignette Overlay for Crisp Contrast */}
                <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
            </div>

            <Container className="relative z-10 flex flex-col items-center text-center">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    {/* Header Title with Gold Flourish Decoration */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-center"
                    >
                        {/* Center Gold Flourish Icon */}
                        <div className="mb-2 md:mb-4">
                            <TitleDecoration title="" className="mx-0" />
                        </div>

                        {/* Main Banner Heading */}
                        <h1 className="text-white font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight leading-none drop-shadow-lg">
                            Shop Our Collection
                        </h1>
                    </motion.div>

                    {/* Subtitle Copy */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.25,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-4 md:mt-6 text-neutral-200 font-hanken text-body-b2 sm:text-lg md:text-xl font-light max-w-xl md:max-w-2xl leading-relaxed drop-shadow"
                    >
                        Discover the world’s finest champagnes, wines and
                        spirits from iconic brands and rare selections
                    </motion.p>
                </div>
            </Container>
        </section>
    );
};
```

## File: .repomixignore

```
# Add patterns to ignore here, one per line
# Example:
# *.log
# tmp/
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
```

## File: repomix.config.json

```json
{
    "$schema": "https://repomix.com/schemas/latest/schema.json",
    "input": {
        "maxFileSize": 52428800
    },
    "output": {
        "filePath": "repomix-output.md",
        "style": "markdown",
        "filePathStyle": "target-relative",
        "parsableStyle": false,
        "fileSummary": true,
        "directoryStructure": true,
        "files": true,
        "removeComments": false,
        "removeEmptyLines": false,
        "compress": false,
        "topFilesLength": 5,
        "showLineNumbers": false,
        "truncateBase64": false,
        "copyToClipboard": false,
        "includeFullDirectoryStructure": false,
        "tokenCountTree": false,
        "git": {
            "sortByChanges": true,
            "sortByChangesMaxCommits": 100,
            "includeDiffs": false,
            "includeLogs": false,
            "includeLogsCount": 50
        }
    },
    "include": [],
    "ignore": {
        "useGitignore": true,
        "useDotIgnore": true,
        "useDefaultPatterns": true,
        "customPatterns": []
    },
    "security": {
        "enableSecurityCheck": true
    },
    "tokenCount": {
        "encoding": "o200k_base"
    }
}
```

## File: public/icon/d_2.svg

```xml
<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.9945 4.66699C20.9764 4.66699 16.4258 9.37797 11.044 11.0951C8.85577 11.7933 7.76163 12.1424 7.31883 12.6345C6.87604 13.1266 6.74637 13.8457 6.48705 15.284C3.71204 30.6743 9.77746 44.9029 24.2427 50.4411C25.7969 51.0362 26.574 51.3337 28.0022 51.3337C29.4303 51.3336 30.2073 51.0361 31.7615 50.4411C46.2258 44.9029 52.2855 30.6743 49.5096 15.284C49.2502 13.8455 49.1205 13.1262 48.6776 12.6341C48.2347 12.142 47.1406 11.7931 44.9525 11.0953C39.5686 9.37833 35.0129 4.66699 27.9945 4.66699Z" stroke="url(#paint0_linear_341_45263)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 30.3333C21 30.3333 23.3333 30.3333 25.6667 35C25.6667 35 33.0784 23.3333 39.6667 21" stroke="url(#paint1_linear_341_45263)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_341_45263" x1="27.9987" y1="4.66699" x2="27.9987" y2="51.3337" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint1_linear_341_45263" x1="30.3333" y1="21" x2="30.3333" y2="35" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
</defs>
</svg>
```

## File: public/icon/d_3.svg

```xml
<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="39.6667" cy="41.9997" r="4.66667" stroke="url(#paint0_linear_341_45290)" stroke-width="2"/>
<circle cx="16.3346" cy="41.9997" r="4.66667" stroke="url(#paint1_linear_341_45290)" stroke-width="2"/>
<path d="M11.668 41.9354C9.10895 41.8078 7.51254 41.4272 6.37651 40.2911C5.24048 39.1551 4.85981 37.5587 4.73225 34.9997M21.0013 41.9997H35.0013M44.3347 41.9354C46.8937 41.8078 48.4901 41.4272 49.6261 40.2911C51.3346 38.5826 51.3346 35.8327 51.3346 30.333V25.6663H40.368C38.6308 25.6663 37.7622 25.6663 37.0592 25.4379C35.6385 24.9763 34.5247 23.8625 34.063 22.4418C33.8346 21.7388 33.8346 20.8702 33.8346 19.133C33.8346 16.5272 33.8346 15.2243 33.492 14.1699C32.7996 12.0388 31.1288 10.368 28.9978 9.67561C27.9433 9.33301 26.6404 9.33301 24.0346 9.33301H4.66797" stroke="url(#paint2_linear_341_45290)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66797 18.667L18.668 18.667" stroke="url(#paint3_linear_341_45290)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66797 25.667H14.0013" stroke="url(#paint4_linear_341_45290)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.832 14H38.0815C41.4774 14 43.1752 14 44.557 14.8253C45.9388 15.6506 46.7438 17.1456 48.3537 20.1355L51.332 25.6667" stroke="url(#paint5_linear_341_45290)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_341_45290" x1="39.6667" y1="37.333" x2="39.6667" y2="46.6663" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint1_linear_341_45290" x1="16.3346" y1="37.333" x2="16.3346" y2="46.6663" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint2_linear_341_45290" x1="28.0013" y1="9.33301" x2="28.0013" y2="41.9997" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint3_linear_341_45290" x1="11.668" y1="18.667" x2="11.668" y2="19.667" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint4_linear_341_45290" x1="9.33464" y1="25.667" x2="9.33464" y2="26.667" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint5_linear_341_45290" x1="42.582" y1="14" x2="42.582" y2="25.6667" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
</defs>
</svg>
```

## File: public/icon/footerDivider.svg

```xml
<svg width="1062" height="393" viewBox="0 0 1062 393" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g clip-path="url(#clip0_317_21394)">
<path d="M479.195 30.7884C474.836 23.7569 466.718 19.3105 458.327 17.9145C454.104 17.1648 449.772 17.0356 445.495 17.5009C441.217 17.9921 437.049 19.1812 433.071 20.7064C425.089 23.8344 418.005 28.6169 411.385 33.7354C404.765 38.8798 398.635 44.5154 392.178 49.7115C385.748 54.9076 378.992 59.7934 371.473 63.2834C367.713 65.0412 363.844 66.4889 359.812 66.7216C355.834 67.0835 351.721 65.9719 349.623 62.9473C347.552 59.9744 347.552 55.8382 348.833 52.3224C350.086 48.7291 352.592 45.5753 355.725 43.1711C362.073 38.3369 370.655 36.3723 378.719 37.639C386.893 38.7506 394.548 42.3439 401.495 46.7644C408.47 51.185 414.872 56.5362 421.629 61.4996C428.358 66.4631 435.605 71.168 443.86 73.9082C451.979 76.6743 461.269 77.5532 469.606 74.5286C477.833 71.4523 484.399 64.395 485.843 56.0192C486.17 53.9252 486.088 51.8054 485.68 49.7115C485.189 47.6434 484.345 45.6787 483.146 43.895C480.776 40.3275 477.152 37.6648 473.175 35.9845C465.192 32.5204 455.684 33.1667 448.056 36.8634C440.345 40.4567 434.161 46.9713 431.546 54.6749C434.461 47.0747 440.754 40.8445 448.382 37.4839C455.956 34.0198 465.11 33.6579 472.63 37.1219C476.362 38.7764 479.74 41.3357 481.865 44.6446C482.955 46.2991 483.691 48.1087 484.099 49.9958C484.426 51.883 484.481 53.8218 484.154 55.7348C482.764 63.3868 476.444 69.953 468.87 72.6415C461.133 75.33 452.415 74.4252 444.65 71.7884C436.777 69.1516 429.802 64.5759 423.154 59.6383C416.48 54.7008 410.105 49.2979 402.939 44.6963C395.829 40.1465 387.846 36.2947 379.101 35.0797C370.383 33.7613 361.011 35.9069 354.064 41.2581C350.604 43.9208 347.797 47.4883 346.381 51.5728C344.991 55.5797 344.828 60.388 347.525 64.2657C348.887 66.127 350.903 67.6005 353.137 68.2726C355.371 69.0223 357.687 69.1516 359.921 68.9965C364.416 68.7121 368.612 67.0835 372.453 65.2739C380.245 61.6289 387.083 56.5362 393.486 51.185C399.915 45.8338 405.936 40.1465 412.42 34.9504C418.877 29.8061 425.77 25.0236 433.507 21.8439C437.349 20.2411 441.381 19.0003 445.549 18.4315C449.717 17.8628 453.967 17.9145 458.136 18.5608C466.473 19.8016 474.564 23.912 479.195 30.7884Z" fill="url(#paint0_linear_317_21394)"/>
<path d="M370.737 51.8832C375.287 49.479 380.736 50.1253 385.258 52.0124C389.89 53.8479 394.14 56.4847 398.117 59.4317C406.072 65.2741 413.401 72.3315 422.828 76.8554C432.254 81.276 442.988 82.8788 453.314 81.5603C458.463 80.8624 463.503 79.4922 468.216 77.5017C472.902 75.4336 477.288 72.8226 481.103 69.5654C476.934 72.3573 472.466 74.7098 467.698 76.3384C462.985 78.0446 458.054 79.182 453.068 79.5956C443.124 80.4229 432.881 78.7943 424.026 74.5805C415.063 70.3926 407.789 63.4645 399.343 57.8548C395.12 55.037 390.625 52.5036 385.721 50.8491C380.872 49.2205 374.96 48.9103 370.737 51.8832Z" fill="url(#paint1_linear_317_21394)"/>
<path d="M330.334 57.0022C335.075 47.0494 343.057 38.5444 352.974 33.1932C362.836 27.8162 374.469 25.412 385.694 26.627C391.333 27.1957 396.837 28.5658 402.204 30.3754C407.571 32.1333 412.666 34.7184 417.842 37.0709C420.403 38.2859 423.073 39.3975 425.443 40.7159C427.84 42.0602 430.156 43.6629 432.499 45.2399C437.267 48.4454 442.116 51.3407 446.993 54.2878C456.801 60.0785 467.181 65.2487 478.187 68.8162C483.664 70.6516 489.385 72.0476 495.133 72.8748C497.994 73.3143 500.882 73.6503 503.742 73.9606C506.603 74.2708 509.518 74.581 512.488 74.5551C518.318 74.581 524.611 73.3143 529.243 69.5141C531.531 67.6787 533.411 65.2487 534.283 62.4568C535.182 59.6907 535.046 56.6919 534.228 53.9776C533.357 51.2632 531.858 48.7298 529.733 46.7392C527.635 44.7745 524.639 43.4303 521.614 43.6629C518.645 43.8439 515.784 45.2657 514.013 47.5148C512.243 49.738 511.507 52.6333 511.916 55.3218C511.67 52.6075 512.542 49.8155 514.34 47.7474C516.111 45.6535 518.89 44.4126 521.642 44.3609C524.448 44.2317 527.09 45.5501 528.998 47.4372C530.905 49.3502 532.24 51.7802 532.948 54.3136C533.656 56.8471 533.684 59.5614 532.839 62.0173C531.994 64.4732 530.278 66.6188 528.153 68.2474C523.848 71.6081 518.1 72.668 512.542 72.5387C509.736 72.487 506.93 72.151 504.069 71.7891C501.209 71.453 498.375 71.0911 495.569 70.6257C489.93 69.7727 484.454 68.4025 479.087 66.5671C468.325 62.9738 458.19 57.8294 448.491 52.0646C443.642 49.1951 438.711 46.2739 434.052 43.1976C431.709 41.6465 429.339 40.0179 426.778 38.5961C424.163 37.1743 421.52 36.1144 418.932 34.8994C413.728 32.5728 408.606 30.0135 403.048 28.2298C397.545 26.3943 391.797 25.0759 385.966 24.6365C374.279 23.6283 362.319 26.3426 352.347 32.0816C342.376 37.9498 334.53 46.7909 330.334 57.0022Z" fill="url(#paint2_linear_317_21394)"/>
<path d="M583.186 30.7889C587.817 23.9125 595.909 19.8022 604.191 18.5871C608.359 17.9409 612.61 17.915 616.778 18.4579C620.946 19.0266 624.978 20.2675 628.82 21.8703C636.557 25.0499 643.45 29.8324 649.907 34.9768C656.363 40.1729 662.412 45.8602 668.841 51.2114C675.244 56.5626 682.082 61.6552 689.874 65.3003C693.715 67.1098 697.911 68.7385 702.406 69.0228C704.64 69.2038 706.956 69.0487 709.19 68.299C711.424 67.601 713.44 66.1534 714.802 64.2921C717.499 60.4144 717.363 55.6061 715.946 51.5991C714.53 47.4888 711.723 43.9472 708.263 41.2845C701.343 35.9333 691.944 33.7877 683.226 35.1061C674.481 36.3469 666.498 40.1729 659.388 44.7227C652.222 49.3242 645.847 54.7013 639.172 59.6647C632.525 64.6023 625.55 69.1779 617.677 71.8148C609.912 74.4774 601.194 75.3564 593.457 72.6679C585.883 69.9793 579.59 63.4131 578.173 55.7612C577.846 53.8482 577.901 51.9093 578.228 50.0222C578.636 48.1351 579.372 46.3255 580.462 44.671C582.587 41.3621 585.938 38.8028 589.697 37.1483C597.217 33.6584 606.371 34.0462 613.945 37.5102C621.573 40.8709 627.866 47.101 630.781 54.7013C628.139 46.9976 621.981 40.4831 614.271 36.8898C606.643 33.1931 597.135 32.5209 589.152 36.0109C585.175 37.6912 581.551 40.3539 579.181 43.9213C577.982 45.6792 577.138 47.6697 576.647 49.7378C576.239 51.8059 576.157 53.9516 576.484 56.0455C577.928 64.4213 584.494 71.4787 592.721 74.555C601.058 77.5796 610.348 76.7006 618.467 73.9346C626.722 71.1943 633.969 66.4894 640.698 61.526C647.455 56.5626 653.857 51.2114 660.831 46.7908C667.779 42.3703 675.434 38.7769 683.608 37.6653C691.699 36.3986 700.254 38.3633 706.601 43.1975C709.762 45.6017 712.241 48.7555 713.494 52.3488C714.775 55.8904 714.775 60.0266 712.704 62.9737C710.634 65.9724 706.492 67.084 702.515 66.7479C698.455 66.4894 694.587 65.0676 690.854 63.3097C683.335 59.8198 676.579 54.9339 670.149 49.7378C663.719 44.5159 657.562 38.9062 650.942 33.7618C644.322 28.6433 637.265 23.8608 629.256 20.7328C625.278 19.1817 621.11 18.0184 616.832 17.5272C612.555 17.0619 608.223 17.1912 604 17.9409C595.636 19.311 587.545 23.7574 583.186 30.7889Z" fill="url(#paint3_linear_317_21394)"/>
<path d="M691.644 51.8835C687.394 48.9364 681.51 49.2466 676.66 50.8236C671.756 52.478 667.261 55.0115 663.038 57.8292C654.593 63.4389 647.291 70.3412 638.355 74.555C629.501 78.7687 619.257 80.3973 609.313 79.5701C604.327 79.1565 599.396 78.019 594.683 76.3128C589.942 74.6584 585.474 72.3318 581.279 69.5398C585.066 72.7971 589.479 75.4081 594.165 77.4761C598.879 79.4667 603.919 80.8627 609.068 81.5348C619.393 82.8532 630.127 81.2763 639.554 76.8299C648.98 72.3059 656.309 65.2227 664.264 59.4062C668.242 56.4591 672.492 53.8223 677.123 51.9869C681.646 50.0997 687.095 49.4534 691.644 51.8835Z" fill="url(#paint4_linear_317_21394)"/>
<path d="M732.02 57.0022C727.825 46.8168 719.978 37.9499 710.062 32.1334C700.09 26.3944 688.157 23.68 676.442 24.6882C670.585 25.1535 664.864 26.4461 659.36 28.2815C653.803 30.0653 648.681 32.6245 643.477 34.9511C640.889 36.1661 638.246 37.226 635.631 38.6479C633.07 40.0697 630.7 41.6725 628.357 43.2494C623.698 46.3257 618.767 49.2469 613.917 52.1163C604.218 57.907 594.111 63.0514 583.322 66.6189C577.955 68.4543 572.479 69.8244 566.84 70.6775C564.033 71.117 561.173 71.4789 558.339 71.8408C555.479 72.2027 552.673 72.5646 549.867 72.5905C544.282 72.7197 538.533 71.6598 534.256 68.2992C532.131 66.6706 530.414 64.5249 529.57 62.0691C528.725 59.6132 528.752 56.8988 529.461 54.3654C530.169 51.832 531.477 49.402 533.411 47.489C535.318 45.6018 537.961 44.2834 540.767 44.4127C543.546 44.4644 546.298 45.7311 548.068 47.7992C549.867 49.8673 550.766 52.6592 550.493 55.3736C550.875 52.6592 550.139 49.7897 548.395 47.5665C546.624 45.3175 543.764 43.8957 540.794 43.7147C537.77 43.482 534.801 44.8263 532.676 46.791C530.523 48.7815 529.052 51.315 528.18 54.0293C527.336 56.7437 527.227 59.7166 528.126 62.5085C529.025 65.3005 530.877 67.7046 533.166 69.5659C537.797 73.366 544.064 74.6069 549.921 74.6069C552.863 74.6327 555.806 74.3225 558.666 74.0123C561.527 73.7021 564.415 73.3402 567.275 72.9266C573.024 72.0993 578.745 70.7034 584.221 68.8679C595.228 65.2746 605.608 60.1044 615.416 54.3395C620.32 51.3925 625.142 48.4972 629.91 45.2916C632.253 43.7147 634.568 42.1119 636.966 40.7677C639.336 39.4493 642.006 38.3635 644.567 37.1226C649.743 34.7443 654.838 32.1851 660.205 30.4272C665.545 28.6434 671.075 27.2475 676.715 26.6788C687.967 25.4638 699.6 27.8421 709.435 33.245C719.324 38.5445 727.28 47.0495 732.02 57.0022Z" fill="url(#paint5_linear_317_21394)"/>
<path d="M531.286 0.000400543C540.675 0.000400543 548.286 7.22256 548.286 16.1315C548.286 25.0405 540.675 32.2627 531.286 32.2627C521.897 32.2627 514.286 25.0405 514.286 16.1315C514.286 7.22256 521.897 0.000400543 531.286 0.000400543Z" fill="url(#paint6_linear_317_21394)"/>
<path d="M499.601 7.03122C504.898 7.03122 509.191 11.1053 509.191 16.1308C509.191 21.1564 504.898 25.2305 499.601 25.2305C494.305 25.2305 490.011 21.1564 490.011 16.1308C490.011 11.1053 494.305 7.03122 499.601 7.03122Z" fill="url(#paint7_linear_317_21394)"/>
<path d="M561.309 7.03122C566.605 7.03122 570.899 11.1053 570.899 16.1308C570.899 21.1564 566.605 25.2305 561.309 25.2305C556.013 25.2305 551.719 21.1564 551.719 16.1308C551.719 11.1053 556.013 7.03122 561.309 7.03122Z" fill="url(#paint8_linear_317_21394)"/>
<path d="M0 16.1313L132.76 16.7517L265.493 16.9844L530.986 17.4238L796.48 16.9844L929.24 16.7517L1062 16.1313L929.24 15.485L796.48 15.2523L530.986 14.8387L265.493 15.2523L132.76 15.485L0 16.1313Z" fill="url(#paint9_linear_317_21394)"/>
</g>
<rect x="415.5" y="98" width="231" height="295" fill="url(#pattern0_317_21394)"/>
<defs>
<pattern id="pattern0_317_21394" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_317_21394" transform="matrix(0.00118181 0 0 0.000926018 -1.39158 -0.328685)"/>
</pattern>
<linearGradient id="paint0_linear_317_21394" x1="443.851" y1="65.1503" x2="381.514" y2="27.3006" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint1_linear_317_21394" x1="447.993" y1="75.8406" x2="409.928" y2="42.6821" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint2_linear_317_21394" x1="473.531" y1="65.0087" x2="414.091" y2="3.01679" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint3_linear_317_21394" x1="674.743" y1="65.1766" x2="612.404" y2="27.3225" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint4_linear_317_21394" x1="658.535" y1="75.8253" x2="620.508" y2="42.6616" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint5_linear_317_21394" x1="670.663" y1="65.0604" x2="611.222" y2="3.08155" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint6_linear_317_21394" x1="538.086" y1="26.1175" x2="518.856" y2="20.9383" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint7_linear_317_21394" x1="503.437" y1="21.7639" x2="492.589" y2="18.8424" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint8_linear_317_21394" x1="565.145" y1="21.7639" x2="554.297" y2="18.8423" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<linearGradient id="paint9_linear_317_21394" x1="743.4" y1="16.9314" x2="743.342" y2="10.7957" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
<clipPath id="clip0_317_21394">
<rect width="1062" height="82" fill="white" transform="matrix(1 0 0 -1 0 82)"/>
</clipPath>

```

## File: public/icon/wineglass.svg

```xml
<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.8333 54.8337H16.5C13.1863 54.8337 10.5 52.1474 10.5 48.8337V24.6523C10.5 23.061 11.1321 21.5349 12.2574 20.4096L15.7426 16.9244C16.8679 15.7991 17.5 14.273 17.5 12.6817V4.66699C17.5 2.734 19.067 1.16699 21 1.16699C22.933 1.16699 24.5 2.734 24.5 4.66699V12.6817C24.5 14.273 25.1321 15.7991 26.2574 16.9244L29.1667 19.8337M38.5 44.3337L44.0555 37.8522C44.9876 36.7647 45.5 35.3797 45.5 33.9474V30.5003C45.5 27.1866 42.8137 24.5003 39.5 24.5003H37.5C34.1863 24.5003 31.5 27.1866 31.5 30.5003V33.9474C31.5 35.3797 32.0124 36.7647 32.9445 37.8522L38.5 44.3337ZM38.5 44.3337V54.8337M33.8333 54.8337H43.1667M17.5 8.16699H24.5" stroke="url(#paint0_linear_341_45231)" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_341_45231" x1="28" y1="1.16699" x2="28" y2="54.8337" gradientUnits="userSpaceOnUse">
<stop stop-color="#CB9938"/>
<stop offset="0.466346" stop-color="#FEED84"/>
<stop offset="0.956737" stop-color="#FDD668"/>
</linearGradient>
</defs>
</svg>
```

## File: public/favicon.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
```

## File: public/icons.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
```

## File: src/assets/react.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: src/assets/vite.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
```

## File: src/components/common/Container.tsx

```typescript
import { cn } from "@/lib/utils";

const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                `2xl:container mx-auto px-4 md:px-7.5 lg:px-15`,
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Container;
```

## File: src/components/common/NavSearch.tsx

```typescript
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

const NavSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="relative flex items-center bg-black/40 rounded-full border px-3.5 py-1.5 w-full max-w-55 focus-within:border-neutral-700 transition-colors ">
            <Search className="size-3 md:size-5 text-gray-400 mr-1 shrink-0" />
            <Input
                type="text"
                placeholder="Search products, brands...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-white w-full border-0 h-6 text-body-c1"
            />
        </div>
    );
};

export default NavSearch;
```

## File: src/components/shop/Shop.tsx

```typescript
import React from "react";
import { Hero } from "../common/Hero";

const Shop = () => {
    return (
        <div>
            <div className="">
                <Hero />
            </div>
        </div>
    );
};

export default Shop;
```

## File: src/components/ui/accordion.tsx

```typescript
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
    return (
        <AccordionPrimitive.Root
            data-slot="accordion"
            className={cn("flex w-full flex-col", className)}
            {...props}
        />
    );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn("not-last:border-b", className)}
            {...props}
        />
    );
}

function AccordionTrigger({
    className,
    children,
    ...props
}: AccordionPrimitive.Trigger.Props) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
                    className,
                )}
                {...props}
            >
                {children}
                <ChevronDownIcon
                    data-slot="accordion-trigger-icon"
                    className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
                />
                <ChevronUpIcon
                    data-slot="accordion-trigger-icon"
                    className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
                />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({
    className,
    children,
    ...props
}: AccordionPrimitive.Panel.Props) {
    return (
        <AccordionPrimitive.Panel
            data-slot="accordion-content"
            className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
            {...props}
        >
            <div
                className={cn(
                    "h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
                    className,
                )}
            >
                {children}
            </div>
        </AccordionPrimitive.Panel>
    );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

## File: src/components/ui/card.tsx

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
```

## File: src/components/ui/dialog.tsx

```typescript
"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
```

## File: src/components/ui/dropdown-menu.tsx

```typescript
import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import { cn } from "@/lib/utils";
import { ChevronRightIcon, CheckIcon } from "lucide-react";

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
    return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
    return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
    return (
        <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
    );
}

function DropdownMenuContent({
    align = "start",
    alignOffset = 0,
    side = "bottom",
    sideOffset = 4,
    className,
    ...props
}: MenuPrimitive.Popup.Props &
    Pick<
        MenuPrimitive.Positioner.Props,
        "align" | "alignOffset" | "side" | "sideOffset"
    >) {
    return (
        <MenuPrimitive.Portal>
            <MenuPrimitive.Positioner
                className="isolate z-50 outline-none"
                align={align}
                alignOffset={alignOffset}
                side={side}
                sideOffset={sideOffset}
            >
                <MenuPrimitive.Popup
                    data-slot="dropdown-menu-content"
                    className={cn(
                        "z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md  duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
                        className,
                    )}
                    {...props}
                />
            </MenuPrimitive.Positioner>
        </MenuPrimitive.Portal>
    );
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
    return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
    className,
    inset,
    ...props
}: MenuPrimitive.GroupLabel.Props & {
    inset?: boolean;
}) {
    return (
        <MenuPrimitive.GroupLabel
            data-slot="dropdown-menu-label"
            data-inset={inset}
            className={cn(
                "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
                className,
            )}
            {...props}
        />
    );
}

function DropdownMenuItem({
    className,
    inset,
    variant = "default",
    ...props
}: MenuPrimitive.Item.Props & {
    inset?: boolean;
    variant?: "default" | "destructive";
}) {
    return (
        <MenuPrimitive.Item
            data-slot="dropdown-menu-item"
            data-inset={inset}
            data-variant={variant}
            className={cn(
                "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
                className,
            )}
            {...props}
        />
    );
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
    return (
        <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
    );
}

function DropdownMenuSubTrigger({
    className,
    inset,
    children,
    ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
    inset?: boolean;
}) {
    return (
        <MenuPrimitive.SubmenuTrigger
            data-slot="dropdown-menu-sub-trigger"
            data-inset={inset}
            className={cn(
                "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            {children}
            <ChevronRightIcon className="ml-auto" />
        </MenuPrimitive.SubmenuTrigger>
    );
}

function DropdownMenuSubContent({
    align = "start",
    alignOffset = -3,
    side = "right",
    sideOffset = 0,
    className,
    ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
    return (
        <DropdownMenuContent
            data-slot="dropdown-menu-sub-content"
            className={cn(
                "w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                className,
            )}
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
            {...props}
        />
    );
}

function DropdownMenuCheckboxItem({
    className,
    children,
    checked,
    inset,
    ...props
}: MenuPrimitive.CheckboxItem.Props & {
    inset?: boolean;
}) {
    return (
        <MenuPrimitive.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            data-inset={inset}
            className={cn(
                "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            checked={checked}
            {...props}
        >
            <span
                className="pointer-events-none absolute right-2 flex items-center justify-center"
                data-slot="dropdown-menu-checkbox-item-indicator"
            >
                <MenuPrimitive.CheckboxItemIndicator>
                    <CheckIcon />
                </MenuPrimitive.CheckboxItemIndicator>
            </span>
            {children}
        </MenuPrimitive.CheckboxItem>
    );
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
    return (
        <MenuPrimitive.RadioGroup
            data-slot="dropdown-menu-radio-group"
            {...props}
        />
    );
}

function DropdownMenuRadioItem({
    className,
    children,
    inset,
    ...props
}: MenuPrimitive.RadioItem.Props & {
    inset?: boolean;
}) {
    return (
        <MenuPrimitive.RadioItem
            data-slot="dropdown-menu-radio-item"
            data-inset={inset}
            className={cn(
                "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            <span
                className="pointer-events-none absolute right-2 flex items-center justify-center"
                data-slot="dropdown-menu-radio-item-indicator"
            >
                <MenuPrimitive.RadioItemIndicator>
                    <CheckIcon />
                </MenuPrimitive.RadioItemIndicator>
            </span>
            {children}
        </MenuPrimitive.RadioItem>
    );
}

function DropdownMenuSeparator({
    className,
    ...props
}: MenuPrimitive.Separator.Props) {
    return (
        <MenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn("-mx-1 my-1 h-px bg-border", className)}
            {...props}
        />
    );
}

function DropdownMenuShortcut({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="dropdown-menu-shortcut"
            className={cn(
                "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
                className,
            )}
            {...props}
        />
    );
}

export {
    DropdownMenu,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
};
```

## File: src/components/ui/input.tsx

```typescript
import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <InputPrimitive
            type={type}
            data-slot="input"
            className={cn(
                "h-6 w-full min-w-0 rounded-lg  outline-none bg-transparent px-2.5 py-1 transition-colors  file:inline-flex file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-0  disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm ",
                className,
            )}
            {...props}
        />
    );
}

export { Input };
```

## File: src/components/ui/sheet.tsx

```typescript
import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

## File: src/components/ui/sonner.tsx

```typescript
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
```

## File: src/components/ui/table.tsx

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

## File: src/config/apiClient.ts

```typescript
import axios, {
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from "axios";

// Create custom axios instance
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Flag to track token generation lifecycle
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

// Drain the queue when refresh succeeds or fails
const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

/* Request Interceptor: Auto-inject access token into headers */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

/* Response Interceptor: Seamless 401 interception & request retry */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;

        // Guard: Trigger refresh only on 401 errors and ensure we don't loop infinitely
        if (error.response?.status === 401 && !originalRequest._retry) {
            // If a refresh is already in progress, queue this request until it's done
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                // Call the silent refresh endpoint (using basic axios to bypass main interceptors)
                const response = await axios.post(
                    `${apiClient.defaults.baseURL}/auth/refresh`,
                    {
                        refreshToken,
                    },
                );

                const {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                } = response.data;

                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                // Clear queue and retry the initial failed request
                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh token failed/expired -> Log user out completely
                processQueue(refreshError, null);
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
```

## File: src/config/queryClient.ts

```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2,
            refetchOnWindowFocus: false,
            retry: 2,
        },
        mutations: {
            // Global error logging layout for data modifications
            onError: (error: any) => {
                console.error(
                    "Mutation Error Global Catch:",
                    error?.message || error,
                );
            },
        },
    },
});
```

## File: src/config/types.ts

```typescript
export interface Product {
    id: string;
    name: string;
    category: string;
    volume: string;
    piecesLeft?: number;
    casesLeft?: number;
    price: number;
    image: string;
    isFeatured?: boolean;
}

export interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onToggleWishlist?: (productId: string) => void;
    className?: string;
    isLandingPage?: boolean;
}
```

## File: src/layouts/DashboardLayout.tsx

```typescript
// src/layouts/DashboardLayout.tsx (Shared by Client & Admin, or adapt into two separate files)
import { Outlet, Link, useNavigate } from "react-router";

interface DashboardLayoutProps {
    isAdmin?: boolean;
}

export const DashboardLayout = ({ isAdmin = false }: DashboardLayoutProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-muted/40">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6 font-semibold tracking-tight">
                    {isAdmin ? "Admin Portal" : "Client Account"}
                </div>
                <nav className="flex-1 space-y-1 px-4 py-4">
                    {isAdmin ? (
                        <>
                            <Link
                                to="/admin"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Overview
                            </Link>
                            <Link
                                to="/admin/products"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Manage Inventory
                            </Link>
                            <Link
                                to="/admin/orders"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                All Orders
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Profile Home
                            </Link>
                            <Link
                                to="/dashboard/orders"
                                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Order History
                            </Link>
                        </>
                    )}
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col sm:pl-64">
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
```

## File: src/lib/utils.ts

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

## File: src/routes/guards.tsx

```typescript
import { Navigate, Outlet, useLocation } from "react-router";

// Mock helper to fetch auth state (replace this with your actual useAuth hook/Zustand store later)
const useAuth = () => {
    const token = localStorage.getItem("accessToken");
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;

    return {
        isAuthenticated: !!token,
        role: user?.role || "guest", // roles: 'guest' | 'client' | 'admin'
    };
};

/* Auth Guard: Protects client views from guests */
export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login, but save the current URL so we can bounce them back after logging in
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

/* Admin Guard: Protects admin dashboard from clients and guests */
export const AdminRoute = () => {
    const { isAuthenticated, role } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role !== "admin") {
        // If authenticated but not an admin, send them to an unauthorized error page or client dashboard
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};
```

## File: src/App.tsx

```typescript
import { RouterProvider } from "react-router";
import { router } from "./routes";

function App() {
    return <RouterProvider router={router} />;
}

export default App;
```

## File: .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## File: components.json

```json
{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "base-nova",
    "rsc": false,
    "tsx": true,
    "tailwind": {
        "config": "",
        "css": "src/index.css",
        "baseColor": "neutral",
        "cssVariables": true,
        "prefix": ""
    },
    "iconLibrary": "lucide",
    "rtl": false,
    "aliases": {
        "components": "@/components",
        "utils": "@/lib/utils",
        "ui": "@/components/ui",
        "lib": "@/lib",
        "hooks": "@/hooks"
    },
    "menuColor": "default",
    "menuAccent": "subtle",
    "registries": {}
}
```

## File: eslint.config.js

```javascript
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser,
        },
    },
]);
```

## File: index.html

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>roseiy_emporium</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
</html>
```

## File: tsconfig.json

```json
{
    "files": [],
    "references": [
        { "path": "./tsconfig.app.json" },
        { "path": "./tsconfig.node.json" }
    ],
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"]
        }
    }
}
```

## File: tsconfig.node.json

```json
{
    "compilerOptions": {
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
        "target": "es2023",
        "lib": ["ES2023"],
        "types": ["node"],
        "skipLibCheck": true,

        /* Bundler mode */
        "module": "nodenext",
        "allowImportingTsExtensions": true,
        "verbatimModuleSyntax": true,
        "moduleDetection": "force",
        "noEmit": true,

        /* Linting */
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "erasableSyntaxOnly": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": ["vite.config.ts"]
}
```

## File: vite.config.ts

```typescript
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
```

## File: src/components/common/BackToTop.tsx

```typescript
import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            if (currentScrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            if (scrollHeight > 0) {
                const progress = Math.min(
                    100,
                    Math.max(0, (currentScrollY / scrollHeight) * 100),
                );
                setScrollProgress(progress);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
        circumference - (scrollProgress / 100) * circumference;

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-black-900/85 border border-gold-500/40 text-gold-400 backdrop-blur-md shadow-lg shadow-black/60 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gold-500 hover:text-black-900 hover:border-gold-400 hover:shadow-gold-500/30 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-black-900 group ${
                isVisible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
            <svg
                className="absolute w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 48 48"
            >
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    className="stroke-gold-500/20"
                    strokeWidth="2.5"
                    fill="transparent"
                />
                <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    className="stroke-gold-400 transition-all duration-150 ease-out"
                    strokeWidth="2.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                />
            </svg>
            <ChevronUp className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </button>
    );
};
```

## File: src/components/common/CartDrawer.tsx

```typescript
// src/components/CartDrawer.tsx
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router";

interface CartDrawerProps {
    children: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
    // Mock cart items data for layout structure (we will wire this to a React Query/Zustand state later)
    const cartItems = [
        {
            id: "1",
            name: "Premium Curated Vintage Reserve",
            price: 120,
            quantity: 1,
            image: "https://via.placeholder.com/80",
        },
        {
            id: "2",
            name: "Roseiy Special Edition Blend",
            price: 85,
            quantity: 2,
            image: "https://via.placeholder.com/80",
        },
    ];

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>

            {/* Slide out panel from the right hand side */}
            <SheetContent
                side="right"
                className="w-full sm:max-w-md bg-pod-gradient border-l border-neutral-800 p-0 text-white flex flex-col h-full"
            >
                {/* Drawer Header */}
                <SheetHeader className="p-6 border-b border-neutral-800 flex flex-row items-center justify-between">
                    <SheetTitle className="text-xl font-serif text-white tracking-wide flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-gold" /> Shopping
                        Bag ({cartItems.length})
                    </SheetTitle>
                </SheetHeader>

                {/* Drawer Scrollable Items Container List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-2">
                            <ShoppingCart className="h-12 w-12 text-neutral-600 stroke-[1.5]" />
                            <p className="text-sm font-medium">
                                Your cart is currently empty.
                            </p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 bg-black/20 p-3 rounded-xl border border-neutral-800/60 items-center"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900 border border-neutral-800"
                                />

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-medium text-white truncate tracking-wide">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs text-gold font-semibold mt-1">
                                        ${item.price}
                                    </p>

                                    {/* Quantity Actions Selector */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button className="h-6 w-6 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 text-neutral-300">
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="text-xs font-semibold w-4 text-center">
                                            {item.quantity}
                                        </span>
                                        <button className="h-6 w-6 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 text-neutral-300">
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>

                                {/* Remove single item action */}
                                <button className="text-neutral-500 hover:text-destructive p-1 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Drawer Sticky Footer Overview panel */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-neutral-800 bg-black/30 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-400">Subtotal</span>
                            <span className="text-lg font-bold text-gold">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 leading-normal">
                            Shipping calculations, taxes, and applied
                            promotional discounts will be computed at the secure
                            checkout step.
                        </p>

                        <div className="grid gap-2 pt-2">
                            <SheetTrigger>
                                <Link
                                    to="/checkout"
                                    className="w-full text-center text-xs font-bold py-3 rounded-lg bg-gold-gradient text-black tracking-wide shadow-lg block hover:opacity-95 transition-opacity"
                                >
                                    Proceed To Checkout
                                </Link>
                            </SheetTrigger>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};
```

## File: src/components/common/ProductCard.tsx

```typescript
import { useState } from "react";
import { Link } from "react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductCardProps } from "@/config/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ProductCard = ({
    product,
    onAddToCart,
    onToggleWishlist,
    className = "",
    isLandingPage = false,
}: ProductCardProps) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        if (onToggleWishlist) onToggleWishlist(product.id);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToCart?.(product);
        toast.success(`${product.name} added to cart`);
    };

    // Format currency string with Nigerian Naira symbol
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    })
        .format(product.price)
        .replace("NGN", "₦");

    return (
        <div
            className={cn(
                `group relative w-full bg-[#111111] border rounded-lg p-4 md:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:fill-gold-300`,
                isWishlisted
                    ? "border-gold-300/80  bg-black-500"
                    : "border-white/30 hover:border-gold-300/80",
                className,
            )}
        >
            {/* Top Action Header: Wishlist Button */}
            <div className="  flex justify-end w-full relative z-10">
                <button
                    onClick={handleWishlist}
                    className="flex size-6 md:size-10 items-center justify-center rounded-full bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer absolute"
                    aria-label="Add to wishlist"
                >
                    <Heart
                        className={`size-3 md:size-4 transition-colors ${
                            isWishlisted
                                ? "fill-gold-300 text-gold-300"
                                : "text-gray-300"
                        }`}
                    />
                </button>
            </div>

            {/* Product Image Link */}
            <Link
                to={`/product/${product.id}`}
                className={cn("block mt-7.5", isLandingPage && "mt-6.25")}
            >
                <div
                    className={cn(
                        "relative w-full h-28.25 sm:h-64  flex items-center justify-center overflow-hidden",
                        isLandingPage && "md:h-76.25 ",
                    )}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="space-y-1.5 mt-4 ">
                <span className="text-[10px] font-medium tracking-widest text-gold-500 uppercase font-hanken">
                    {product.category}
                </span>

                <Link to={`/product/${product.id}`} className="block mt-1">
                    <h3 className="text-white font-playfair text-hg-c3 md:text-[1.5625rem] font-bold leading-snug line-clamp-2 min-h-8.5 md:min-h-14  transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-[0.5rem] md:text-[0.8125rem] text-neutral-400 font-hanken mt-1.25">
                    {product.volume}
                    {product.piecesLeft !== undefined &&
                        ` • ${product.piecesLeft} Pieces Left`}
                    {product.casesLeft !== undefined &&
                        ` • ${product.casesLeft} Cases Left`}
                </p>

                <div className="mt-2">
                    <span className="text-gold-500 font-playfair text-[1.25rem] md:text-[1.9375rem] font-bold tracking-tight">
                        {formattedPrice}
                    </span>
                </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="mt-5">
                <Button
                    onClick={handleAddToCart}
                    className="w-full h-10 md:h-12 bg-[#1A1A1A] hover:bg-white/20  border border-neutral-700 text-white font-hanken font-medium text-body-c1 md:text-body-b3 rounded-sm transition-all duration-800 cursor-pointer"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};
```

## File: src/components/home/AboutSection.tsx

```typescript
import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { aboutSplashImg } from "@/lib/site_data";
import { motion } from "framer-motion";

export const AboutSection = () => {
    return (
        <section
            className="w-full bg-black-700 pt-16 md:py-24 overflow-hidden"
            id="about"
        >
            <Container>
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Brand Story Content (Slides in from left) */}
                    <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-start text-left space-y-4 md:space-y-6"
                    >
                        {/* Title Decoration */}
                        <TitleDecoration
                            title="About Roseiy Emporium"
                            className="mx-0"
                        />

                        {/* Primary Headline */}
                        <h2 className="text-white font-playfair text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                            Curated with Purpose.{" "}
                            <br className="hidden sm:inline" />
                            Poured with Excellence
                        </h2>

                        {/* Descriptive Paragraph */}
                        <p className="text-neutral-300 font-hanken text-body-c1 md:text-body-b2 font-light leading-relaxed max-w-138">
                            Welcome to Roseiy Emporium, your trusted destination
                            for premium wines, champagnes, spirits, whiskies,
                            cognacs, and more. We pride ourselves on offering
                            authentic products, exceptional service, and a
                            seamless shopping experience. Whether you’re
                            celebrating a special occasion or simply enjoying
                            the finer things in life, we’re here to help you
                            raise every moment in style.
                        </p>
                    </motion.div>

                    {/* Right Column: Hero Splash Image (Slides in from right) */}
                    <motion.div
                        initial={{ x: 60, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2, // Slight delay for a cascading effect
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="relative w-full flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-lg lg:max-w-none">
                            <img
                                src={aboutSplashImg}
                                alt="Whiskey toast splash"
                                className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out hover:scale-102"
                            />
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
```

## File: src/components/home/BrandBanner.tsx

```typescript
import {
    hennessyLogo,
    chamdorLogo,
    johnnieWalkerLogo,
    brandDivider,
    topFlourishOrnament,
} from "@/lib/site_data";

export const BrandBanner = () => {
    const brandLogos = [
        { name: "Hennessy", src: hennessyLogo },
        { name: "Chamdor", src: chamdorLogo },
        // { name: "Eva", src: evaLogo },
        { name: "Johnnie Walker", src: johnnieWalkerLogo },
    ];

    // Double the array to guarantee seamless looping without jumps
    const marqueeBrands = [...brandLogos, ...brandLogos];

    return (
        <section className="w-full bg-black-900  pt-4 overflow-hidden">
            <div className="container mx-auto max-w-6xl relative flex flex-col items-center">
                {/* Top Ornamental Gold Divider Header */}
                <div className="w-full flex justify-center items-center relative mb-1">
                    <img
                        src={topFlourishOrnament}
                        alt=""
                        className="w-full max-w-4xl h-auto object-contain"
                    />
                </div>

                {/* Infinite Marquee Track Container */}
                <div className="w-full overflow-hidden mask-gradient-x max-w-245.25 mx-auto relative ">
                    {/* Left Edge Fade / Shadow Overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-linear-to-r from-black-900 to-transparent" />

                    {/* Right Edge Fade / Shadow Overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-linear-to-l from-black-900 to-transparent" />

                    <div className="flex items-center w-max animate-marquee space-x-8 hover:paused">
                        {marqueeBrands.map((brand, index) => (
                            <div
                                key={`${brand.name}-${index}`}
                                className="flex items-center gap-8 shrink-0"
                            >
                                {/* Brand Logo Container */}
                                <div className="h-13.75 md:h-26.75 flex items-center justify-center px-4 opacity-80 hover:opacity-100 transition-opacity">
                                    <img
                                        src={brand.src}
                                        alt={brand.name}
                                        className="max-h-full w-auto object-contain"
                                    />
                                </div>

                                {/* Gold Starburst Separator Asset */}
                                <img
                                    src={brandDivider}
                                    alt="golden section"
                                    className="h-6 w-6 md:h-12 md:w-12 object-contain shrink-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Ornamental Gold Divider Footer */}
                <div className="w-full flex justify-center items-center relative mt-1">
                    <img
                        src={topFlourishOrnament}
                        alt="global section"
                        className="w-full max-w-4xl h-auto object-contain rotate-180"
                    />
                </div>
            </div>
        </section>
    );
};
```

## File: src/components/home/ContactSection.tsx

```typescript
import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { contactChampagneImg } from "@/lib/site_data";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { PiSnapchatLogoLight } from "react-icons/pi";
import { IoLogoInstagram } from "react-icons/io5";
import { motion } from "framer-motion";

export const ContactSection = () => {
    return (
        <section
            className="w-full bg-black-700 mt-16 pt-12 md:pt-24 overflow-hidden"
            id="contact"
        >
            <Container>
                <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Champagne Bottle & Glass Graphic (Slides in from the bottom) */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 1.2,
                            ease: "easeInOut",
                        }}
                        className="relative w-full flex justify-center items-end h-full order-2 lg:order-1"
                    >
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            <img
                                src={contactChampagneImg}
                                alt="Champagne Bottle and Glass"
                                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Details & Socials (Slides in from the left) */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-start text-left space-y-8 order-1 lg:order-2"
                    >
                        {/* Section Title Header */}
                        <div className="flex flex-col items-start space-y-2">
                            <TitleDecoration
                                title="Contact Us"
                                className="mx-0"
                            />
                            <h2 className="text-white mt-2 font-playfair text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                We’re Here to Help You
                            </h2>
                        </div>

                        {/* Contact Channels List */}
                        <div className="flex flex-col space-y-6 w-full">
                            {/* Phone Numbers */}
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-black-900 flex items-center justify-center shrink-0">
                                    <PhoneCall className="size-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-body-c1 md:text-base text-white">
                                        Call Us On
                                    </span>
                                    <a
                                        href="tel:+2348156664737"
                                        className="gradient-text font-hanken text-base md:text-body-b1 font-bold hover:underline"
                                    >
                                        +2348156664737 & +447946301028
                                    </a>
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-black-900 flex items-center justify-center shrink-0">
                                    <Mail className="size-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-body-c1 md:text-base text-white">
                                        Email Us
                                    </span>
                                    <a
                                        href="mailto:omobolajrose@gmail.com"
                                        className="gradient-text font-hanken md:text-body-b1 text-base font-bold hover:underline"
                                    >
                                        omobolajrose@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Physical Location */}
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full bg-black-900 flex items-center justify-center shrink-0">
                                    <MapPin className="size-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-body-c1 md:text-base text-white">
                                        Visit Us at
                                    </span>
                                    <p className="gradient-text font-hanken text-base md:text-body-b1 font-bold">
                                        16 pinnock beach road ajiran , lekki ,
                                        Lagos
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="pt-4 flex flex-col space-y-3 md:mb-16">
                            <h3 className="text-white font-playfair text-xl font-bold">
                                Follow Us
                            </h3>
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="size-12 rounded-full bg-black-900 flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-500 transition-all cursor-pointer"
                                    aria-label="Instagram"
                                >
                                    <IoLogoInstagram className="size-5 text-white" />
                                </a>
                                <a
                                    href="https://snapchat.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="size-12 rounded-full bg-black-900 flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-500 transition-all cursor-pointer"
                                    aria-label="Snapchat"
                                >
                                    <PiSnapchatLogoLight />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
```

## File: src/components/home/FaqSection.tsx

```typescript
import { useState } from "react";
import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

export const FaqSection = () => {
    // Keep item 1 open by default
    const [openId, setOpenId] = useState<number | null>(1);

    const faqs: FaqItem[] = [
        {
            id: 1,
            question: "Do you sell authentic products?",
            answer: "Yes. All products sold by Roseiy Emporium are 100% genuine and sourced from trusted suppliers.",
        },
        {
            id: 2,
            question: "Do you offer delivery?",
            answer: "Yes, we offer fast and secure doorstep delivery across designated locations. Express handling is also available for urgent orders.",
        },
        {
            id: 3,
            question: "Can I place an order for a special occasion?",
            answer: "Absolutely! We cater to corporate gifting, weddings, anniversaries, and personal celebrations with custom gift packaging.",
        },
        {
            id: 4,
            question: "How do I place an order?",
            answer: "Simply browse our catalog, add your desired bottles to the cart, and proceed through our quick and secure online checkout.",
        },
        {
            id: 5,
            question: "What payment methods do you accept?",
            answer: "We accept debit/credit cards, direct bank transfers, and secure online payment gateways for your convenience.",
        },
        {
            id: 6,
            question: "Can I cancel my order?",
            answer: "Orders can be canceled prior to dispatch by contacting our support team promptly with your order reference number.",
        },
        {
            id: 7,
            question: "Do I need to be over 18 to purchase alcohol?",
            answer: "Yes. In compliance with statutory regulations, you must be 18 years of age or older to purchase alcoholic beverages from Roseiy Emporium.",
        },
    ];

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="w-full bg-black-900 py-16 md:py-24" id="faqs">
            <Container>
                <div className="w-full mx-auto flex flex-col items-center">
                    {/* Title Header: Slides in from top inline */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mb-10 md:mb-14 flex flex-col items-center text-center"
                    >
                        <TitleDecoration title="Frequently Asked Questions" />

                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-104.5 leading-tight">
                            Answers, Before You Ask.
                        </h2>

                        <p className="mt-3 md:mt-4 text-body-c1 md:text-body-b2 max-w-81.75 md:max-w-171 text-center text-neutral-300 font-hanken font-light">
                            Find answers to the most common questions about
                            orders, delivery, payments, returns, and our premium
                            collection.
                        </p>
                    </motion.div>

                    {/* Custom Accordion Container */}
                    <div className="w-full space-y-2 md:space-y-4 max-w-275 mx-auto">
                        {faqs?.map((faq, index) => {
                            const isOpen = openId === faq.id;

                            return (
                                /* FAQ Item: Slides in from left inline with index delay */
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.1 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.2 + index * 0.2,
                                        ease: "easeInOut",
                                    }}
                                    className="bg-black-700 rounded-lg px-6 overflow-hidden transition-all duration-300"
                                >
                                    {/* Question Header Button */}
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                                    >
                                        <span
                                            className={`font-hanken text-body-b3 sm:text-body-b2 font-bold transition-colors duration-200 ${
                                                isOpen
                                                    ? "text-gold-500"
                                                    : "text-white group-hover:text-gold-500"
                                            }`}
                                        >
                                            {faq.id}. {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`size-5 shrink-0 transition-transform duration-300 ${
                                                isOpen
                                                    ? "rotate-180 text-gold-500"
                                                    : "text-white group-hover:text-gold-500"
                                            }`}
                                        />
                                    </button>

                                    {/* Expandable Answer (Tailwind native transition) */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out text-neutral-300 font-hanken text-body-c1 sm:text-body-b3 font-light leading-relaxed ${
                                            isOpen
                                                ? "grid-rows-[1fr] opacity-100 pb-5"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};
```

## File: src/components/ui/button.tsx

```typescript
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/80",
                outline:
                    "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
                ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
                destructive:
                    "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default:
                    "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
                lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                icon: "size-8",
                "icon-xs":
                    "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
                "icon-sm":
                    "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
                "icon-lg": "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant = "default",
    size = "default",
    ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={cn(
                "cursor-pointer",
                buttonVariants({ variant, size, className }),
            )}
            {...props}
        />
    );
}

export { Button, buttonVariants };
```

## File: src/routes/index.tsx

```typescript
import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProtectedRoute, AdminRoute } from "@/routes/guards";
import Home from "@/components/home/Home";
import Shop from "@/components/shop/Shop";

// Placeholder Views (Replace with actual components)

const Login = () => <div>Authentication Form</div>;
const ClientHome = () => <div>Client Profile Overview</div>;
const ClientOrders = () => <div>List of client orders</div>;

// Lazy Load Admin Views to drastically optimize initial bundle performance
// const AdminOverview = React.lazy(() => import("@/features/admin/Overview"));
const AdminProducts = () => <div>Admin Product Management Table</div>;

export const router = createBrowserRouter([
    // 1. Public Domain Paths
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "login", element: <Login /> },
            {
                path: "unauthorized",
                element: (
                    <div className="text-center py-12">
                        You do not have access to this page.
                    </div>
                ),
            },
        ],
    },

    // 2. Protected Client Dashboard Domain Paths
    {
        path: "/dashboard",
        element: <ProtectedRoute />, // Wrap inside the auth guard block
        children: [
            {
                element: <DashboardLayout isAdmin={false} />, // Inject standard client layout window
                children: [
                    { index: true, element: <ClientHome /> },
                    { path: "orders", element: <ClientOrders /> },
                ],
            },
        ],
    },

    // 3. Protected Admin Management Domain Paths
    {
        path: "/admin",
        element: <AdminRoute />, // Wrap inside the strict admin rule check
        children: [
            {
                element: <DashboardLayout isAdmin={true} />, // Inject heavy dashboard layout window
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense
                                fallback={
                                    <div className="p-6">
                                        Loading dashboard panels...
                                    </div>
                                }
                            >
                                {/* <AdminOverview /> */}
                            </Suspense>
                        ),
                    },
                    { path: "products", element: <AdminProducts /> },
                ],
            },
        ],
    },

    // Catch-all fallbacks
    {
        path: "*",
        element: (
            <div className="p-12 text-center text-xl">404 - Page Not Found</div>
        ),
    },
]);
```

## File: src/main.tsx

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./config/queryClient";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            {/* Devtools will only open/render during local development */}
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
            <Toaster />
        </QueryClientProvider>
    </React.StrictMode>,
);
```

## File: README.md

````markdown
# Roseiy Emporium 🍾🍷

Roseiy Emporium is a premium e-commerce platform curated for exceptional taste, specializing in authentic champagnes, fine wines, and premium spirits. Built using modern, high-performance web technologies, the application delivers a premium, smooth, and highly responsive user experience.

---

## 🚀 Tech Stack

The application is powered by the following core technologies:

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using the `@tailwindcss/vite` plugin for build-time compilation)
- **Routing:** [React Router v8](https://reactrouter.com/) (declarative routing with support for nested layouts and auth guards)
- **Data Fetching & State:** [TanStack React Query v5](https://tanstack.com/query) (for optimized query caching and API state management)
- **UI & Design System:**
    - [@base-ui/react](https://base-ui.com/) (unstyled components for custom, accessible UI)
    - [Lucide React](https://lucide.dev/) (clean, consistent icons)
    - `class-variance-authority` (CVA) & `tailwind-merge` (for robust component styling and variant support)
    - `tw-animate-css` (smooth micro-animations and transitions)
    - Geist & Playfair Display fonts (premium typography)

---

## 📂 Project Structure

```text
roseiy_emporium/
├── src/
│   ├── assets/          # Static image and visual assets (logos, background decorations)
│   ├── components/      # UI components
│   │   ├── common/      # Global layout components (Navbar, CartDrawer, Container)
│   │   ├── home/        # Home/Landing page specific components (Hero, Home)
│   │   └── ui/          # Low-level UI primitives (Button, Card, Dialog, Sheet, etc.)
│   ├── config/          # Configurations for Axios (apiClient) and React Query (queryClient)
│   ├── layouts/         # High-level layouts (PublicLayout, DashboardLayout)
│   ├── lib/             # Shared utilities (cn helper) and site static data (site_data)
│   ├── routes/          # Router definitions (routes index, route guards)
│   ├── App.tsx          # Router provider initialization
│   ├── main.tsx         # Application entrypoint with global providers
│   └── index.css        # Global CSS stylesheet & Tailwind 4 design system configuration
├── public/              # Static public resources
├── tsconfig.json        # TypeScript configuration settings
├── vite.config.ts       # Vite bundler configuration
└── package.json         # Project metadata and dependencies
```

---

## ✨ Features

- **Premium Landing Page:** A visually stunning hero section featuring premium champagne imagery, gold gradients, elegant typography, and interactive exploration prompts.
- **Responsive Header & Navigation:** A floating glassmorphic navbar with active route indications (custom vector underlines), profile/action dropdowns, and a responsive mobile drawer menu.
- **Cart Drawer System:** Integrated sliding cart drawer supporting instant badge count updates and interactive list overlays.
- **Role-Based Route Guards:** Seamless client and admin route separation using route guard middleware (`ProtectedRoute` and `AdminRoute`).
- **Lazy-Loaded Dashboards:** Admin panel and dashboard views are optimized with React dynamic imports (`Suspense` and `lazy`) to minimize initial bundle size and boost performance.

---

## 🛠️ Getting Started

### 📋 Prerequisites

Ensure you have **Node.js** (v18+ recommended) and **npm** installed on your system.

### 📥 Installation

Clone the repository and install all dependencies:

```bash
npm install
```

### 💻 Development

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will run locally at `http://localhost:5173` (or the next available port).

### 🏗️ Production Build

To compile the TypeScript code and bundle the application assets for production deployment:

```bash
npm run build
```

The production-ready assets will be generated in the `dist/` directory.

### 🔍 Preview Build

To preview the built production app locally:

```bash
npm run preview
```

### 🧹 Linting

To run ESLint and inspect the codebase for code quality issues:

```bash
npm run lint
```
````

## File: tsconfig.app.json

```json
{
    "compilerOptions": {
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
        "target": "es2023",
        "lib": ["ES2023", "DOM"],
        "module": "esnext",
        "types": ["vite/client"],
        "allowArbitraryExtensions": true,
        "skipLibCheck": true,
        // "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"]
        },

        /* Bundler mode */
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "verbatimModuleSyntax": true,
        "moduleDetection": "force",
        "noEmit": true,
        "jsx": "react-jsx",

        /* Linting */
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "erasableSyntaxOnly": true,
        "noFallthroughCasesInSwitch": true
    },
    "include": ["src"]
}
```

## File: src/components/common/TitleDecoration.tsx

```typescript
import { badgeOrnament } from "@/lib/site_data";
import { cn } from "@/lib/utils";

const TitleDecoration = ({
    title,
    className,
}: {
    title: string;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "w-fit  md:max-w-4xl mx-auto  md:space-y-6",
                className,
            )}
        >
            {/* Premium Tag Capsule */}
            <div className="inline-flex items-center gap-2   bg-transparent py-1 md:py-2">
                <img
                    src={badgeOrnament}
                    alt=""
                    className="h-4.25 w-auto object-contain opacity-70"
                />
                <span className="text-[0.8125rem] gradient-text font-playfair md:text-hg-c1 tracking-[0.15em] font-medium text-white ">
                    {title}
                </span>
                <img
                    src={badgeOrnament}
                    alt=""
                    className="h-4.25 w-auto object-contain scale-x-[-1] opacity-70"
                />
            </div>
        </div>
    );
};

export default TitleDecoration;
```

## File: src/components/home/BestSellers.tsx

```typescript
import TitleDecoration from "@/components/common/TitleDecoration";
import {
    donJulioReposadoImg,
    hennessyXoImg,
    claseAzulImg,
} from "@/lib/site_data";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface BestSellerProduct {
    id: string;
    name: string;
    category: string;
    volume: string;
    piecesLeft?: number;
    casesLeft?: number;
    price: number;
    image: string;
    title: string;
}

const HorizontalProductCard = ({ product }: { product: BestSellerProduct }) => {
    // Format currency string into Nigerian Naira
    const formattedPrice = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    })
        .format(product.price)
        .replace("NGN", "₦");

    return (
        <div
            // to={`/product/${product?.id}`}
            className="group flex items-center gap-4 sm:gap-6 p-4 rounded-xl transition-all duration-300 mx-auto md:max-w-full max-w-75"
        >
            {/* Product Bottle Image with Shadow Glow Effect */}
            <div className="relative md:shrink-0 w-32 sm:w-40 h-48 max-w-27.75 md:max-w-40 sm:h-64.5 flex items-center justify-center">
                <img
                    src={product?.image}
                    alt={product?.name}
                    className="max-h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <img src="/icon/line.svg" alt="divider" className="h-full" />

            {/* Product Details (Right Side) */}
            <div className="flex flex-col justify-center space-y-2 w-full max-w-33.75 md:max-w-53.25 overflow-hidden transition-all transform duration-1000">
                {/* Category Tag */}
                <h4 className="text-body-c2 md:text-body-c1 font-semibold tracking-widest text-gold-500 uppercase font-hanken">
                    {product?.category}
                </h4>

                <h2 className="text-hg-c1 md:text-hg-b3 font-semibold tracking-widest text-white uppercase w-full max-w-35 md:max-w-49.5 font-playfair whitespace-pre-line">
                    {product?.title}
                </h2>

                {/* Stock Meta Information */}
                <p className="text-body-c1 text-black-200 font-hanken">
                    {product?.volume}
                    {product?.piecesLeft &&
                        ` • ${product?.piecesLeft} Pieces Left`}
                    {product?.casesLeft &&
                        ` • ${product?.casesLeft} Cases Left`}
                </p>

                {/* Big Price Tag */}
                <div className="pt-1">
                    <span className="text-gold-500 font-playfair text-2xl sm:text-hg-b2 font-bold tracking-tight">
                        {formattedPrice}
                    </span>
                </div>
                <div className="transition-all transform md:translate-y-full group-hover:translate-y-0 duration-1000">
                    <Button
                        variant="outline"
                        className={cn(
                            "mt-6 px-8 w-full rounded-sm h-11 md:hidden group-hover:block",
                        )}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const BestSellers = () => {
    const bestSellers: BestSellerProduct[] = [
        {
            id: "don-julio-reposado",
            name: "Don Julio Reposado",
            category: "Tequila",
            volume: "75cl",
            piecesLeft: 22,
            price: 650000,
            image: donJulioReposadoImg,
            title: "Don Julio Reposado",
        },
        {
            id: "hennessy-xo",
            name: "Hennessy XO",
            category: "Cognac",
            volume: "75cl",
            piecesLeft: 22,
            casesLeft: 5,
            price: 650000,
            image: hennessyXoImg,
            title: "Hennessy \n X.O",
        },
        {
            id: "clase-azul",
            name: "Clase Azul Reposado",
            category: "Tequila",
            volume: "75cl",
            casesLeft: 5,
            price: 650000,
            image: claseAzulImg,
            title: "Clase Azul \n Reposado ",
        },
    ];

    return (
        <section className="w-full bg-black-900 pt-16 md:py-24 border-t border-white/5">
            <div className="flex flex-col items-center">
                <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center">
                    {/* Section Title Header: Fades in directly */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-center text-center"
                    >
                        <TitleDecoration title="Our Best Sellers" />
                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-2xl leading-tight">
                            Most Loved By Our Customers
                        </h2>

                        <p className="mt-3 md:mt-4 text-body-c1 md:text-body-b2 max-w-81.75 md:max-w-171 text-center text-neutral-300 font-hanken font-light">
                            Discover the bottles our customers return for time
                            and again, celebrated for their exceptional quality,
                            and unforgettable character.
                        </p>
                    </motion.div>

                    {/* 3-Column Horizontal Card Layout: Mapped with inline index delays */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-12 md:mt-16">
                        {bestSellers.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2 + index * 0.15, // Staggers the items one by one
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <HorizontalProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
```

## File: src/components/home/RoseiyDifference.tsx

```typescript
import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { categoryHeaderDivider } from "@/lib/site_data";
import { motion } from "framer-motion";

export const RoseiyDifference = () => {
    const features = [
        {
            imgUrl: "/icon/wineglass.svg",
            title: "Curated Selection",
            description:
                "Only the world’s finest champagnes, wines, spirits and rare collections",
        },
        {
            imgUrl: "/icon/d_2.svg",
            title: "Guaranteed Authenticity",
            description:
                "Every bottle is sourced through trusted distribution to ensure genuine quality",
        },
        {
            imgUrl: "/icon/d_3.svg",
            title: "Secure Delivery",
            description:
                "Professionally packaged and delivered with the care premium beverages deserve",
        },
    ];

    return (
        <section className="w-full bg-black-800 py-16 md:py-24 border-t border-white/5">
            <Container className="flex flex-col items-center">
                <div className="w-full max-w-300 mx-auto">
                    {/* Section Header: Fades in directly */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-center text-center"
                    >
                        <TitleDecoration title="The Roseiy Difference" />

                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-2xl leading-tight">
                            Why Discerning <br className="md:hidden" />{" "}
                            Customers Choose Roseiy
                        </h2>

                        <p className="mt-3 md:mt-4 text-body-c1 md:text-body-b2 max-w-81.75 md:max-w-171 text-center text-neutral-300 font-hanken font-light">
                            Every bottle in our collection is carefully sourced,
                            expertly handled, and selected to deliver an
                            exceptional experience from purchase to pour.
                        </p>
                    </motion.div>

                    {/* 3-Column Features Grid: Mapped with inline index delays */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full mt-8 md:mt-20">
                        {features.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2 + index * 0.2, // Staggers the items one by one
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="flex flex-col items-center text-center"
                            >
                                {/* Gold Icon */}
                                <div className="h-14 md:h-25 flex items-center justify-center ">
                                    <img
                                        src={item.imgUrl}
                                        alt={item?.title}
                                        className="w-full h-full"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-white mt-2 font-playfair text-[1.25rem] md:text-[31px] font-bold tracking-wide">
                                    {item.title}
                                </h3>

                                {/* Gold Flourish Underline */}
                                <div className="w-full max-w-xs pt-1 pb-2">
                                    <img
                                        src={categoryHeaderDivider}
                                        alt="divider"
                                        className="w-full h-5.5 object-contain opacity-70 mx-auto"
                                        style={{
                                            filter: "brightness(0) invert(1)",
                                        }}
                                    />
                                </div>

                                {/* Description */}
                                <p className="text-white max-w-66.25 mt-1 font-hanken text-body-c1 md:text-body-b3 font-light leading-relaxed">
                                    {item?.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};
```

## File: src/components/home/SignatureSelections.tsx

```typescript
import Container from "../common/Container";
import TitleDecoration from "../common/TitleDecoration";
import { ProductCard } from "../common/ProductCard";
import { Link } from "react-router";
import { products } from "@/lib/site_data";
import { motion } from "framer-motion";

export const SignatureSelections = () => {
    return (
        <section
            className="w-full bg-black-900 py-16 md:py-24 overflow-hidden"
            id="shop"
        >
            <Container className="flex flex-col items-center">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Header Block: Fades in from the left */}
                    <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full max-w-127.5"
                    >
                        <TitleDecoration
                            title="Signature Selections"
                            className="md:mx-0 px-0"
                        />
                        <h2 className="text-hg-b3 md:text-hg-h3 text-center md:text-left mx-auto md:mx-0 font-bold mt-1 md:mt-2 font-playfair max-w-63.25 md:max-w-full text-white">
                            Handpicked for Exceptional Moments
                        </h2>
                        <p className="mt-2 md:mt-4 text-body-c1 md:text-body-b2 max-w-76.5 md:max-w-full text-center mx-auto md:mx-0 md:text-left text-neutral-300 font-hanken font-light">
                            Discover rare bottles and timeless classics chosen
                            for their quality, character, and legacy.
                        </p>
                    </motion.div>

                    {/* Products Grid: Fades in smoothly */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2, // Triggers right after the header slide-in
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mt-4 md:mt-16"
                    >
                        {products?.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isLandingPage={true}
                            />
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-12 md:mt-16 flex justify-center"
                    >
                        <Link
                            to="/shop"
                            className="flex items-center justify-center px-12 md:py-3.5 bg-gold-g text-black-900 h-10 md:h-12 font-hanken font-bold text-body-b3 rounded-md tracking-wider shadow-xl hover:opacity-95 transition-all active:scale-[0.98] w-full max-w-62 md:max-w-68 text-center"
                        >
                            View All
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
```

## File: src/components/home/TestimonialsSection.tsx

```typescript
import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
    id: string;
    name: string;
    initials: string;
    rating: number;
    comment: string;
    bgFade: boolean;
}

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`size-4 ${
                        star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-white "
                    }`}
                />
            ))}
        </div>
    );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    return (
        <div
            className={cn(
                "w-full rounded-lg p-6 sm:p-8 flex flex-col space-y-4 transition-all duration-300 hover:border-gold-300/30",
                testimonial?.bgFade ? "bg-black-500" : "bg-black-800",
            )}
        >
            {/* Header: Initials Avatar + Name & Rating */}
            <div className="flex items-center gap-4">
                {/* Initials Circle */}
                <div className="size-14 sm:size-18 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-black/40">
                    <span className="text-white text-lg sm:text-body-b1 font-medium tracking-wide">
                        {testimonial.initials}
                    </span>
                </div>

                {/* Name & Star Rating */}
                <div className="flex flex-col space-y-1">
                    <h3 className="text-white font-playfair text-xl sm:text-hg-c1 font-bold leading-tight">
                        {testimonial.name}
                    </h3>
                    <StarRating rating={testimonial.rating} />
                </div>
            </div>

            {/* Testimonial Copy */}
            <p className="text-white font-hanken text-body-c1 font-normal leading-relaxed">
                {testimonial.comment}
            </p>
        </div>
    );
};

export const TestimonialsSection = () => {
    const testimonials: Testimonial[] = [
        {
            id: "1",
            name: "Peter Odejobi",
            initials: "PO",
            rating: 5,
            bgFade: true,
            comment:
                "The bottle arrived beautifully packaged and exactly as described. You can tell Roseiy takes presentation seriously. I'll definitely be ordering again.",
        },
        {
            id: "2",
            name: "Omobolaji Abubakar",
            initials: "OA",
            rating: 5,
            bgFade: false,
            comment:
                "Everything about the experience felt premium, from the packaging to the product itself. My only suggestion would be to offer more payment options at checkout.",
        },
        {
            id: "3",
            name: "Toheeb Kasali",
            initials: "TK",
            rating: 3,
            bgFade: true,
            comment:
                "The quality of the bottle was excellent, but one item I wanted was already sold out. Hopefully they restock faster because I'd love to purchase again.",
        },
        {
            id: "4",
            name: "Rasheed Bello",
            initials: "RB",
            rating: 5,
            bgFade: false,
            comment:
                "Finding authentic premium champagne locally isn't always easy, so I was impressed by the selection. Delivery was smooth and everything arrived in perfect condition.",
        },
        {
            id: "5",
            name: "Busayo Daramola",
            initials: "RB",
            rating: 4,
            bgFade: true,
            comment:
                "Great shopping experience overall. The website was easy to navigate and checkout was seamless. I just wish there were more whisky options available.",
        },
        {
            id: "6",
            name: "Ghali Abdullahi",
            initials: "GA",
            rating: 3,
            bgFade: false,
            comment:
                "Customer support responded quickly when I had questions about my order. Delivery took a little longer than expected, but the bottle arrived safely and was worth the wait.",
        },
    ];

    return (
        <section className="w-full bg-black-900 py-16 md:py-24 border-t border-white/5">
            <Container>
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
                    {/* Mobile Title Header (Appears second) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mb-10 lg:hidden flex flex-col items-center"
                    >
                        <TitleDecoration title="Testimonials" />
                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-104.5 leading-tight">
                            Hear From Our Happy Customers
                        </h2>
                    </motion.div>

                    {/* Staggered Desktop Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full items-start">
                        {/* Left Column */}
                        <div className="flex flex-col gap-6 lg:gap-8 md:mt-28">
                            {/* Card 0: Appears First */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[0]}
                                />
                            </motion.div>

                            {/* Card 3: Appears First */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[3]}
                                />
                            </motion.div>
                        </div>

                        {/* Middle Column with Central Title Header */}
                        <div className="flex flex-col gap-6 lg:gap-8 items-center">
                            {/* Card 1: Appears Second */}
                            <motion.div
                                className="w-full"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[1]}
                                />
                            </motion.div>

                            {/* Desktop Central Title Block (Appears Second) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="hidden lg:flex h-full items-center justify-center mb-4 py-4 w-full flex-col"
                            >
                                <TitleDecoration title="Testimonials" />
                                <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white max-w-104.5 leading-tight">
                                    Hear From Our Happy Customers
                                </h2>
                            </motion.div>

                            {/* Card 4: Appears Second */}
                            <motion.div
                                className="w-full"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[4]}
                                />
                            </motion.div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6 lg:gap-8 md:mt-28">
                            {/* Card 2: Appears Second */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[2]}
                                />
                            </motion.div>

                            {/* Card 5: Appears First */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false, amount: 0.15 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <TestimonialCard
                                    testimonial={testimonials[5]}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
```

## File: src/layouts/PublicLayout.tsx

```typescript
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { BackToTop } from "@/components/common/BackToTop";
import { Outlet } from "react-router";

export const PublicLayout = () => {
    return (
        <div className="flex min-h-screen flex-col antialiased">
            <header className="sticky top-0 z-40 w-full ">
                <Navbar />
            </header>
            <main className="flex-1 ">
                <Outlet />
            </main>
            <BackToTop />
            <Footer />
        </div>
    );
};
```

## File: src/components/common/Footer.tsx

```typescript
import { Link } from "react-router";
import Container from "@/components/common/Container";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerLogo } from "@/lib/site_data";
import { IoLogoInstagram } from "react-icons/io5";
import { PiSnapchatLogoLight } from "react-icons/pi";

const QUICK_LINKS = [
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "FAQs", href: "/faq" },
    { label: "Track Order", href: "/track-order" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
];

// Shop Categories Data Array
const SHOP_CATEGORIES = [
    { label: "Champagne", href: "/catalog?category=champagne" },
    { label: "Wine", href: "/catalog?category=wine" },
    { label: "Whiskey", href: "/catalog?category=whiskey" },
    { label: "Cognac", href: "/catalog?category=cognac" },
    { label: "Tequila", href: "/catalog?category=tequila" },
    { label: "Gin", href: "/catalog?category=gin" },
    { label: "Rum", href: "/catalog?category=rum" },
    { label: "Bottled Water", href: "/catalog?category=bottled-water" },
    {
        label: "Drinks Accessories",
        href: "/catalog?category=drinks-accessories",
    },
];

const footerLinks = [
    {
        title: "Quick Links",
        data: QUICK_LINKS,
    },
    {
        title: "Shop Categories",
        data: SHOP_CATEGORIES,
    },
];

export const Footer = () => {
    return (
        <footer className="w-full  pt-16 md:pt-30 ">
            <Container>
                <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-10 lg:gap-12 items-start ">
                    {/* Column 1: Brand Logo, Tagline & Copyright */}
                    <div className="flex flex-col space-y-4 w-full md:max-w-86">
                        <Link to="/" className="inline-block">
                            <img
                                src={footerLogo}
                                alt="Roseiy Emporium"
                                className="h-28 sm:h-42.75 w-auto object-contain -ml-2"
                            />
                        </Link>

                        <p className="text-white font-hanken text-xs sm:text-body-b3 font-light leading-relaxed max-w-xs">
                            Roseiy Emporium, your trusted destination for
                            premium wines, champagnes, spirits, whiskies,
                            cognacs, and more.
                        </p>

                        <p className="text-white font-hanken text-xs sm:text-body-b3 pt-2">
                            © 2026 Roseiy Emporium All Rights Reserved.
                        </p>
                    </div>

                    {footerLinks.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col w-full max-w-fit space-y-4"
                        >
                            <h3 className="text-white font-playfair font-bold text-xl sm:text-[1.9375rem]">
                                {item.title}
                            </h3>
                            <ul className="flex flex-col space-y-3 font-hanken text-body-c1 sm:text-body-b2 text-white">
                                {item.data.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="hover:text-gold-500 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Column 2: Quick Links */}
                    {/* <div className="flex flex-col w-full max-w-fit space-y-4">
                        <h3 className="text-white font-playfair font-bold text-xl sm:text-[1.9375rem]">
                            Quick Links
                        </h3>
                        <ul className="flex mt-5 flex-col space-y-5 font-hanken text-body-c1 sm:text-body-b2 text-white font-light">
                            <li>
                                <Link
                                    to="/shop"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/track-order"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div> */}

                    {/* Column 3: Shop Categories */}
                    {/* <div className="flex flex-col space-y-4">
                        <h3 className="text-white font-playfair font-bold text-xl sm:text-[1.9375rem]">
                            Shop
                        </h3>
                        <ul className="flex flex-col space-y-3 font-hanken text-body-c1 sm:text-body-b2 text-neutral-300 font-light">
                            <li>
                                <Link
                                    to="/catalog?category=champagne"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Champagne
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=wine"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Wine
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=whiskey"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Whiskey
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=cognac"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Cognac
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=tequila"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Tequila
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=gin"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Gin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=rum"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Rum
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=bottled-water"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Bottled Water
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/catalog?category=drinks-accessories"
                                    className="hover:text-gold-500 transition-colors"
                                >
                                    Drinks Accessories
                                </Link>
                            </li>
                        </ul>
                    </div> */}

                    {/* Column 4: Contact & Socials */}
                    <div className="flex flex-col space-y-6">
                        <h3 className="text-white font-playfair font-bold text-xl sm:text-2xl">
                            Contact
                        </h3>

                        {/* Contact Channel List */}
                        <div className="flex flex-col space-y-4">
                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <div className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center shrink-0">
                                    <Phone className="size-5 text-white" />
                                </div>
                                <a
                                    href="tel:+2348156664737"
                                    className="text-neutral-300 hover:text-gold-500 font-hanken text-body-c1 sm:text-body-b2 font-semibold transition-colors"
                                >
                                    +2348156664737 <br /> & +447946301028
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <div className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center shrink-0">
                                    <Mail className="size-5 text-white" />
                                </div>
                                <a
                                    href="mailto:omobolajrose@gmail.com"
                                    className="text-neutral-300 hover:text-gold-500 font-hanken text-body-c1 sm:text-body-b2 font-semibold transition-colors"
                                >
                                    omobolajrose@gmail.com
                                </a>
                            </div>

                            {/* Address */}
                            <div className="flex items-center gap-3">
                                <div className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center shrink-0">
                                    <MapPin className="size-5 text-white" />
                                </div>
                                <span className="text-neutral-300 font-hanken text-body-c1 sm:text-body-b2 font-semibold leading-snug">
                                    16 pinnock beach road ajiran , <br /> lekki
                                    , Lagos
                                </span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-2 flex flex-col space-y-3">
                            <h4 className="text-white font-playfair font-bold text-lg">
                                Follow Us
                            </h4>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-500 transition-all cursor-pointer"
                                    aria-label="Instagram"
                                >
                                    <IoLogoInstagram className="size-5 text-white" />
                                </a>
                                <a
                                    href="https://snapchat.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="size-11 rounded-full bg-black-700 border border-white/10 flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-500 transition-all cursor-pointer"
                                    aria-label="Snapchat"
                                >
                                    <PiSnapchatLogoLight />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <div className="relative ">
                <div className="mx-auto -top-10 md:top-0 w-full max-w-[323px] md:max-w-265.5 mt-20 absolute left-1/2 transform -translate-x-1/2 ">
                    <img
                        src="/icon/footerDivider.svg"
                        alt="divider"
                        className="w-full object-cover"
                    />
                </div>
                <div className="flex items-end min-h-[296px]">
                    <img
                        src={"/icon/footerField.svg"}
                        alt="logo"
                        className="w-full hidden md:block"
                    />
                    <img
                        src={"/icon/footerFieldMobile.svg"}
                        alt="logo"
                        className=" w-full md:hidden  "
                    />
                </div>
            </div>
        </footer>
    );
};
```

## File: src/components/common/Navbar.tsx

```typescript
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import {
    Heart,
    ShoppingCart,
    User,
    ChevronDown,
    Search,
    Menu,
    X,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { CartDrawer } from "./CartDrawer";
import { activeNavImg, logo, navLinks } from "@/lib/site_data";
import Container from "./Container";

const NavSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="relative flex items-center bg-black/40 rounded-full px-3.5 py-1.5 w-full transition-colors">
            <Search className="size-4 text-black-300 mr-1 shrink-0" />
            <Input
                type="text"
                placeholder="Search products, brands...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-body-c1 text-white w-full border-none h-6 focus-visible:ring-0 p-0"
            />
        </div>
    );
};

export const Navbar = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll position to toggle the black background
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => {
        const currentPathWithHash = location.pathname + location.hash;
        if (href === "/") {
            return location.pathname === "/" && !location.hash;
        }
        return currentPathWithHash === href;
    };

    const handleNavClick = (href: string) => {
        if (href.includes("#")) {
            const hash = href.split("#")[1];
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setMobileOpen(false);
    };

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location]);

    return (
        <header className="w-full bg-transparent">
            {/* Smooth transition for background when scrolling */}
            <div
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
                    isScrolled
                        ? "bg-black-900 backdrop-blur-md border-b border-white/10 shadow-2xl py-3 md:py-4"
                        : "bg-transparent py-4 md:py-6"
                }`}
            >
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                        duration: 1.2,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="pointer-events-auto"
                >
                    <Container className="gap-3 lg:gap-4 mx-auto flex items-center justify-between">
                        {/* Brand Logo Section */}
                        <Link to="/" className="flex items-center shrink-0">
                            <img
                                src={logo}
                                alt="Roseiy Emporium"
                                className="h-12 md:h-20 w-auto object-contain transition-all duration-300"
                            />
                        </Link>

                        {/* Desktop Center: Main Navigation Pod */}
                        <nav className="hidden shrink-0 bg-white/10 lg:flex h-15 items-center gap-10 rounded-lg px-10 py-4 border-[0.5px] border-[#FEFEFE99] backdrop-blur-md">
                            {navLinks?.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() =>
                                            handleNavClick(link.href)
                                        }
                                        className={`relative text-sm font-medium tracking-wide transition-colors duration-200 h-7 shrink-0 overflow-hidden w-auto ${
                                            active
                                                ? "gradient-text"
                                                : "text-white hover:text-gold-300"
                                        }`}
                                    >
                                        {link.name}

                                        {active && (
                                            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                                                <img
                                                    src={activeNavImg}
                                                    alt="active icon"
                                                    className="object-contain h-1.75 w-5.25"
                                                />
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Integrated Right Action Pod */}
                        <div className="bg-pod-gradient flex items-center h-14 md:h-15 gap-3 md:gap-4 rounded-xl py-2 px-3 md:px-8 border-[0.5px] border-ivory-400/60 shadow-xl lg:w-full max-w-116">
                            <div className="hidden lg:flex items-center gap-4">
                                <NavSearch />
                                <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors cursor-pointer">
                                    <Heart className="size-5" />
                                </button>
                            </div>

                            {/* Cart */}
                            <CartDrawer>
                                <button className="relative flex size-9 md:size-10 shrink-0 items-center justify-center rounded-full bg-black/90 md:bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors focus:outline-none cursor-pointer">
                                    <ShoppingCart className="size-4 md:size-5" />
                                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-gradient text-[0.6rem] font-black text-black-900">
                                        0
                                    </span>
                                </button>
                            </CartDrawer>

                            {/* Profile Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <button className="shrink-0 flex size-9 md:size-10 items-center justify-center rounded-full bg-black/40 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors focus:outline-none" />
                                    }
                                >
                                    <User className="size-3 md:size-5" />
                                    <ChevronDown className="size-1.5 md:size-2 text-gray-400" />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-25.5 mt-2 bg-white/10 border-[0.2px] border-ivory-100 text-white rounded-sm py-4 px-2 flex flex-col items-center gap-4 backdrop-blur-sm shadow-none"
                                >
                                    <DropdownMenuItem
                                        render={
                                            <Link
                                                to="/login"
                                                className="w-full text-center flex items-center justify-center text-sm font-medium py-2 rounded-lg text-gray-300 hover:text-white cursor-pointer focus:bg-neutral-800"
                                            />
                                        }
                                    >
                                        Login
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        render={
                                            <Link
                                                to="/register"
                                                className="w-full text-center flex items-center justify-center text-sm font-bold py-2 rounded-lg bg-gold-g text-black cursor-pointer shadow-md tracking-wide hover:opacity-90 active:scale-98 transition-all"
                                            />
                                        }
                                    >
                                        Register
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Mobile Drawer */}
                            <Sheet
                                open={mobileOpen}
                                onOpenChange={setMobileOpen}
                                modal={false}
                            >
                                <SheetTrigger>
                                    <button className="lg:hidden flex size-9 items-center justify-center rounded-full bg-black/90 border border-neutral-800 text-white focus:outline-none cursor-pointer">
                                        <Menu className="size-4" />
                                    </button>
                                </SheetTrigger>

                                <SheetContent
                                    side="right"
                                    className="bg-black-900 border-l border-neutral-900 text-white p-6 pt-8 flex flex-col gap-8 shadow-2xl"
                                    showCloseButton={false}
                                >
                                    <div className="flex items-center justify-between w-full border-b border-neutral-900 pb-4">
                                        <img
                                            src={logo}
                                            alt="Roseiy Emporium"
                                            className="h-10 w-auto object-contain"
                                        />
                                        <SheetClose className="text-neutral-400 hover:text-white transition-colors focus:outline-none">
                                            <X className="size-5" />
                                        </SheetClose>
                                    </div>

                                    <nav className="flex flex-col gap-4 pl-2">
                                        {navLinks.map((link) => {
                                            const active = isActive(link.href);
                                            return (
                                                <Link
                                                    key={link.name}
                                                    to={link.href}
                                                    onClick={() =>
                                                        handleNavClick(
                                                            link.href,
                                                        )
                                                    }
                                                    className={`text-body-c1 font-normal tracking-wide transition-colors ${
                                                        active
                                                            ? "gradient-text font-bold"
                                                            : "text-white hover:text-gold-300"
                                                    }`}
                                                >
                                                    {link.name}
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </Container>
                </motion.div>
            </div>
        </header>
    );
};
```

## File: src/components/home/IconicBrands.tsx

```typescript
import { Link } from "react-router";
import Container from "@/components/common/Container";
import TitleDecoration from "@/components/common/TitleDecoration";
import { Button } from "@/components/ui/button";
import {
    brandDivider,
    categoryHeaderDivider,
    glenfiddichLogo,
    domPerignonLogo,
    veuveClicquotLogo,
    moetLogo,
    hennessyLogo,
    donJulioLogo,
    claseAzulLogo,
    tequilaLogo,
} from "@/lib/site_data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BrandItem {
    name: string;
    logo: string;
    href: string;
    showMobile: boolean;
}

export const IconicBrands = () => {
    // Top Row Brands
    const topRowBrands: BrandItem[] = [
        {
            name: "Glenfiddich",
            logo: glenfiddichLogo,
            href: "/catalog?brand=glenfiddich",
            showMobile: true,
        },
        {
            name: "Dom Pérignon",
            logo: domPerignonLogo,
            href: "/catalog?brand=dom-perignon",
            showMobile: false,
        },
        {
            name: "Veuve Clicquot",
            logo: veuveClicquotLogo,
            href: "/catalog?brand=veuve-clicquot",
            showMobile: true,
        },
        {
            name: "Moët & Chandon",
            logo: moetLogo,
            href: "/catalog?brand=moet-chandon",
            showMobile: false,
        },
    ];

    // Bottom Row Brands
    const bottomRowBrands: BrandItem[] = [
        {
            name: "Hennessy",
            logo: hennessyLogo,
            href: "/catalog?brand=hennessy",
            showMobile: true,
        },
        {
            name: "Don Julio",
            logo: donJulioLogo,
            href: "/catalog?brand=don-julio",
            showMobile: false,
        },
        {
            name: "Clase Azul",
            logo: claseAzulLogo,
            href: "/catalog?brand=clase-azul",
            showMobile: true,
        },
        {
            name: "Tequila ",
            logo: tequilaLogo,
            href: "/catalog?brand=tequila",
            showMobile: false,
        },
    ];

    const renderBrandRow = (brands: BrandItem[]) => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 w-full ">
            {brands?.map((brand, i) => {
                const index = i;

                return (
                    <motion.div
                        key={brand.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2 + index * 0.15, // Staggers left-to-right
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex items-center justify-center gap-0 md:gap-12"
                    >
                        {/* Brand Card with Hover States */}
                        <div className="group relative flex flex-col items-center justify-center p-4 ">
                            {/* Logo Asset */}
                            <div className="min-h-17.5 md:min-h-26.75 max-w-20.5 md:max-w-full  flex items-end justify-center">
                                <img
                                    src={brand?.logo}
                                    alt={brand?.name}
                                    className="max-h-auto w-full object-contain  transition-opacity duration-300"
                                />
                            </div>

                            <div className=" flex flex-col items-center justify-center bg-black-900/90 backdrop-blur-xs  transition-opacity duration-300 rounded-md py-2">
                                <img
                                    src={categoryHeaderDivider}
                                    alt=""
                                    className="w-auto max-w-full h-4 object-contain mb-2 brightness-20 invert group-hover:invert-0 group-hover:brightness-100"
                                />
                                <Link
                                    to={brand.href}
                                    className="opacity-0 group-hover:opacity-100 min-h-7.75"
                                >
                                    <Button className=" px-4 text-[0.8125rem] font-hanken bg-white/10 rounded-sm h-7 md:h-11 border border-neutral-700 text-white hover:bg-gold-gradient  transition-all cursor-pointer">
                                        Explore Collection
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Gold Starburst Separator */}
                        {index < brands.length - 1 && (
                            <img
                                src={brandDivider}
                                alt="divider"
                                className={cn(
                                    "h-6 w-6 md:h-8 md:w-8 object-contain md:shrink-0 hidden",
                                    brand.showMobile
                                        ? "block"
                                        : "hidden md:block",
                                )}
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );

    return (
        <section className="w-full bg-black-900 py-16 md:py-24 border-t border-white/5 ">
            <Container className="flex flex-col items-center">
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
                    {/* Section Header: Fades in */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-center"
                    >
                        <TitleDecoration title="Our Iconic Brands" />
                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair max-w-147.5">
                            Iconic Brands, Timeless Craftsmanship
                        </h2>
                    </motion.div>

                    {/* Brand Showcase Grid */}
                    <div className="w-full mt-10 md:mt-16 flex flex-col items-center">
                        {renderBrandRow(topRowBrands)}
                        {renderBrandRow(bottomRowBrands)}
                    </div>

                    {/* Bottom CTA Action Button: Fades in after grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-12 md:mt-16 flex justify-center w-full"
                    >
                        <Link
                            to="/shop"
                            className="flex items-center justify-center px-12 md:py-3.5 bg-gold-g text-black-900 h-10 md:h-12 font-hanken font-bold text-body-b3 rounded-md tracking-wider shadow-xl hover:opacity-95 transition-all active:scale-[0.98] w-full max-w-62 md:max-w-68 text-center"
                        >
                            View All
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
```

## File: src/index.css

```css
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap");

@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme {
    /* Ivory Scale */
    --color-ivory-50: #fefefe;
    --color-ivory-100: #fdfdfb;
    --color-ivory-200: #fcfbf9;
    --color-ivory-300: #fafaf7;
    --color-ivory-400: #f9f9f5;
    --color-ivory-500: #f8f7f3;
    --color-ivory-600: #e2e1dd;
    --color-ivory-700: #b0afad;
    --color-ivory-800: #888886;
    --color-ivory-900: #686866;

    /* Black Scale */
    --color-black-50: #e8e8e8;
    --color-black-100: #b8b8b8;
    --color-black-200: #969696;
    --color-black-300: #666666;
    --color-black-400: #494949;
    --color-black-500: #1b1b1b;
    --color-black-600: #191919;
    --color-black-700: #131313;
    --color-black-800: #0f0f0f;
    --color-black-900: #0b0b0b;

    /* Gold Scale */
    --color-gold-50: #fcf8eb;
    --color-gold-100: #f4e8bf;
    --color-gold-200: #efdda1;
    --color-gold-300: #f2eacd;
    --color-gold-400: #e4c45b;
    --color-gold-500: #ddb532;
    --color-gold-600: #c9a52e;
    --color-gold-700: #9d8124;
    --color-gold-800: #7a641c;
    --color-gold-900: #5d4c15;

    /* Font Families */
    --font-playfair: "Playfair Display", serif;
    --font-hanken: "Hanken Grotesk", sans-serif;
}

/* Headings Font System Utilities (Playfair Display) */
@utility text-hg-h1 {
    font-family: var(--font-playfair);
    font-size: 76px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-hg-h2 {
    font-family: var(--font-playfair);
    font-size: 61px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-hg-h3 {
    font-family: var(--font-playfair);
    font-size: 49px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-hg-b1 {
    font-family: var(--font-playfair);
    font-size: 39px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-hg-b2 {
    font-family: var(--font-playfair);
    font-size: 32px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-hg-b3 {
    font-family: var(--font-playfair);
    font-size: 25px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-hg-c1 {
    font-family: var(--font-playfair);
    font-size: 20px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-hg-c2 {
    font-family: var(--font-playfair);
    font-size: 14px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-hg-c3 {
    font-family: var(--font-playfair);
    font-size: 13px;
    font-optical-sizing: auto;
    font-style: normal;
}

/* Body Font System Utilities (Hanken Grotesk) */
@utility text-body-h1 {
    font-family: var(--font-hanken);
    font-size: 49px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-body-h2 {
    font-family: var(--font-hanken);
    font-size: 39px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-body-h3 {
    font-family: var(--font-hanken);
    font-size: 31px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-body-b1 {
    font-family: var(--font-hanken);
    font-size: 25px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-body-b2 {
    font-family: var(--font-hanken);
    font-size: 20px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-body-b3 {
    font-family: var(--font-hanken);
    font-size: 16px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-body-c1 {
    font-family: var(--font-hanken);
    font-size: 13px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-body-c2 {
    font-family: var(--font-hanken);
    font-size: 10px;
    font-optical-sizing: auto;
    font-style: normal;
}

@utility text-body-c3 {
    font-family: var(--font-hanken);
    font-size: 8px;
    font-optical-sizing: auto;
    font-style: normal;
}

@layer base {
    * {
        @apply font-hanken;
    }

    body {
        @apply bg-black-900 text-white overflow-x-hidden;
    }

    html {
        @apply font-hanken;
    }
}

@layer utilities {
    .gradient-text {
        background: linear-gradient(
            266.49deg,
            #cb9938 -0.22%,
            #feed84 27.53%,
            #fdd668 65.35%,
            #feed84 96.88%
        );

        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
    }
}

.bg-pod-gradient {
    background: linear-gradient(180deg, #242426 0%, #171718 100%);
}

.bg-gold-gradient {
    background: linear-gradient(90deg, #f0d78c 0%, #cfa54e 100%);
}

.bg-gold-g {
    background: linear-gradient(
        180deg,
        #cb9938 0%,
        #feed84 46.63%,
        #fdd668 95.67%
    );
}

/* Infinite Marquee Animation Keyframes */
@keyframes marquee {
    0% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(-50%);
    }
}

.animate-marquee {
    animation: marquee 5s linear infinite;
}

.mask-gradient-x {
    mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
    );
    -webkit-mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 15%,
        black 85%,
        transparent 100%
    );
}
```

## File: src/components/home/Hero.tsx

```typescript
import { Link } from "react-router";
import { motion } from "framer-motion";
import { heroBg, badgeOrnament, heroBg2, heroBgMobile } from "@/lib/site_data";
import Container from "../common/Container";

export const Hero = () => {
    return (
        <section className="relative w-full min-h-150 bg-black-900 overflow-hidden">
            <div className="flex flex-col justify-between">
                {/* Background Image Layer */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <img
                        src={heroBg}
                        alt="Premium selection background"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Content Layer Container */}
                <Container className="w-full relative z-20 pt-28.5 md:pt-46.75 flex-1 flex md:flex-row flex-col justify-between items-center gap-2 md:gap-3 lg:gap-0">
                    {/* Top/Left Section: Heading Title & Decorative Tag */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full md:w-full max-w-4xl md:space-y-6"
                    >
                        {/* Premium Tag Capsule */}
                        <div
                            className="inline-flex items-center gap-1 bg-white/10 border border-[#FEFEFE33] rounded-lg px-1 md:px-5 py-1 md:py-2"
                            style={{ backdropFilter: "blur(6px)" }}
                        >
                            <img
                                src={badgeOrnament}
                                alt=""
                                className="h-4.25 w-auto object-contain opacity-70"
                            />
                            <span className="text-[0.625rem] font-playfair md:text-hg-c1 tracking-[0.15em] font-medium text-white">
                                Premium Beverages
                            </span>
                            <img
                                src={badgeOrnament}
                                alt=""
                                className="h-[17px] w-auto object-contain scale-x-[-1] opacity-70"
                            />
                        </div>

                        {/* Main H1 Design Header */}
                        <div className="relative mt-2 md:mt-0">
                            <h1 className="text-white font-playfair font-bold tracking-wide leading-[1.1] text-4xl sm:text-6xl md:text-7xl lg:text-hg-h1">
                                Curated for <br />
                                <span className="gradient-text font-playfair">
                                    Exceptional
                                </span>{" "}
                                Taste.
                            </h1>

                            {/* Elegant Flourish Underline Ornament */}
                            {/* <div className="mt-4 md:mt-6 max-w-xs sm:max-w-sm">
                                <img
                                    src={decorativeDivider}
                                    alt=""
                                    className="w-full h-auto object-contain opacity-80"
                                />
                            </div> */}
                        </div>
                    </motion.div>

                    {/* Bottom/Right Section: Description & CTAs */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full md:max-w-105"
                    >
                        <div className="max-w-md space-y-6 md:space-y-8 text-left lg:text-left">
                            <p className="text-body-c2 sm:text-body-c1 lg:text-body-b3 text-ivory-300 font-hanken font-light leading-relaxed tracking-wide">
                                Discover authentic champagnes, fine wines, and
                                premium spirits thoughtfully selected to elevate
                                every celebration, milestone, and unforgettable
                                occasion.
                            </p>

                            {/* CTA Action Deck */}
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/shop"
                                    className="md:px-8 px-4 py-3.5 bg-gold-gradient text-black-900 font-hanken font-bold text-body-c1 rounded-md tracking-wider w-full text-center shadow-lg hover:opacity-95 transition-opacity active:scale-[0.99]"
                                >
                                    Shop Collection
                                </Link>

                                <Link
                                    to="/categories"
                                    className="md:px-8 px-4 py-3.5 bg-transparent border border-white text-white font-hanken font-medium text-body-c1 rounded-md w-full text-center tracking-wider hover:bg-white/10 transition-colors active:scale-[0.99]"
                                >
                                    Explore Categories
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </div>

            {/* Background Product Banner */}
            <motion.div
                initial={{ x: 120, y: 120, opacity: 0, scale: 0.9 }}
                whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full max-w-380 mx-auto h-full"
            >
                <img
                    src={heroBg2}
                    alt="Premium selection background"
                    className="w-full h-full relative max-h-228.25 -mt-55 object-cover object-center z-10 hidden md:block"
                />

                <img
                    src={heroBgMobile}
                    alt="Premium selection background"
                    className="w-full h-full relative max-h-100 object-cover object-center z-10 md:hidden"
                />
            </motion.div>
        </section>
    );
};
```

## File: package.json

```json
{
    "name": "roseiy_emporium",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite --host",
        "build": "tsc -b && vite build",
        "lint": "eslint .",
        "preview": "vite preview"
    },
    "dependencies": {
        "@base-ui/react": "^1.6.0",
        "@fontsource-variable/geist": "^5.2.9",
        "@tailwindcss/vite": "^4.3.3",
        "@tanstack/react-query": "^5.101.2",
        "axios": "^1.18.1",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "framer-motion": "^12.43.0",
        "lucide-react": "^1.25.0",
        "next-themes": "^0.4.6",
        "react": "^19.2.7",
        "react-dom": "^19.2.7",
        "react-icons": "^5.7.0",
        "react-router": "^8.2.0",
        "shadcn": "^4.13.1",
        "sonner": "^2.0.7",
        "tailwind-merge": "^3.6.0",
        "tailwindcss": "^4.3.3",
        "tw-animate-css": "^1.4.0"
    },
    "devDependencies": {
        "@babel/core": "^7.29.7",
        "@eslint/js": "^10.0.1",
        "@rolldown/plugin-babel": "^0.2.3",
        "@tanstack/eslint-plugin-query": "^5.101.2",
        "@tanstack/react-query-devtools": "^5.101.2",
        "@types/babel__core": "^7.20.5",
        "@types/node": "^24.13.3",
        "@types/react": "^19.2.17",
        "@types/react-dom": "^19.2.3",
        "@vitejs/plugin-react": "^6.0.3",
        "babel-plugin-react-compiler": "^1.0.0",
        "eslint": "^10.6.0",
        "eslint-plugin-react-hooks": "^7.1.1",
        "eslint-plugin-react-refresh": "^0.5.3",
        "globals": "^17.7.0",
        "typescript": "~6.0.2",
        "typescript-eslint": "^8.62.0",
        "vite": "^8.1.1"
    }
}
```

## File: src/components/home/CategoryGrid.tsx

```typescript
import { Link } from "react-router";
import { motion } from "framer-motion";
import { categoryHeaderDivider, categories } from "@/lib/site_data";
import Container from "../common/Container";
import TitleDecoration from "../common/TitleDecoration";
import { Button } from "../ui/button";

interface CategoryCardProps {
    title: string;
    image: string;
    href: string;
}

const CategoryCard = ({ title, image, href }: CategoryCardProps) => {
    return (
        <Link
            to={href}
            className="group max-w-81.5 md:max-w-full mx-auto relative w-full h-118.25 sm:h-133.25 rounded-lg overflow-hidden border border-white/10 flex flex-col justify-between p-6 transition-all duration-300 hover:border-gold-300/50 hover:shadow-2xl hover:shadow-gold-500/10"
        >
            {/* Category Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:blur-[7px]"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-black/60 transition-opacity duration-300 group-hover:from-black/70 group-hover:to-black/80" />
            </div>

            {/* Top Category Title Block with Gold Ornament Header */}
            <div className="relative z-10 flex flex-col items-center text-center mt-4 space-y-2">
                <img
                    src={categoryHeaderDivider}
                    alt="divider"
                    className="w-full h-7.75 object-contain opacity-80 group-hover:opacity-100 transition-opacity brightness-0 invert group-hover:invert-0 group-hover:brightness-100"
                />

                <h3 className="text-white font-playfair text-hg-b2 font-bold tracking-wide drop-shadow-md group-hover:bg-gradient-to-r group-hover:from-[#CB9938] group-hover:via-[#FEED84] group-hover:to-[#FDD668] group-hover:bg-clip-text group-hover:text-transparent">
                    {title}
                </h3>
            </div>

            {/* Bottom Action Area */}
            <Button className="relative px-10 rounded-sm py-3.5 h-11 mx-auto z-10 border border-white w-fit gap-10 group-hover:flex justify-center transition-all duration-300 mb-2 hidden backdrop-blur-xl cursor-pointer">
                Shop Now
            </Button>
        </Link>
    );
};

export const CategoryGrid = () => {
    return (
        <section className="w-full bg-black-900 pt-16 md:pt-24 overflow-hidden">
            <Container className="flex flex-col items-center">
                <div className="lg:max-w-288.5 mx-auto w-full">
                    {/* Section Title Header: Slides Down from Top */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col items-center"
                    >
                        <TitleDecoration title="Explore Our Collection" />
                        <h2 className="text-hg-b3 md:text-hg-h3 text-center font-bold mt-1 md:mt-2 font-playfair text-white">
                            A Collection for Every Taste
                        </h2>
                        <p className="mt-2 md:mt-4 text-body-c1 md:text-body-b2 max-w-160.5 text-center mx-auto text-neutral-300 font-hanken font-light">
                            From celebratory champagnes to timeless whiskies,
                            discover a carefully curated selection from the
                            world's most respected producers.
                        </p>
                    </motion.div>

                    {/* 3-Column Grid: Tiny Staggered Fade Up */}
                    <motion.div
                        initial={{ y: 35, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2, // Triggers smoothly right after title moves in
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-9.25 w-full mt-8 md:mt-16"
                    >
                        {categories?.map((cat) => (
                            <CategoryCard
                                key={cat.title}
                                title={cat.title}
                                image={cat.image}
                                href={cat.href}
                            />
                        ))}
                    </motion.div>

                    {/* Bottom Center CTA Action: Fades up with grid */}
                    <motion.div
                        initial={{ y: 25, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-12 md:mt-16 flex justify-center"
                    >
                        <Link
                            to="/shop"
                            className="flex items-center justify-center px-12 md:py-3.5 bg-gold-g text-black-900 h-10 md:h-12 font-hanken font-bold text-body-b3 rounded-md tracking-wider shadow-xl hover:opacity-95 transition-all active:scale-[0.98] w-full max-w-62 md:max-w-68 text-center"
                        >
                            View All
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};
```

## File: src/lib/site_data.ts

```typescript
import type { Product } from "@/config/types";

export const logo =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1785511077/Roseiy_Emporium_Logo_2_aikz0d.png";
export const footerLogo =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1785061330/footerLogo_qx820x.png";
export const activeNavImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784400550/navUder_dw5zhf.png";

export const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Shop", href: "/shop" },
    { name: "Contact Us", href: "/#contact" },
    { name: "FAQs", href: "/#faqs" },
];
// hero section
export const heroBg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784496510/image_43_buvvmk.png";
export const heroBg2 =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784497637/hero_drink_mzkc2u.png";
export const heroBgMobile =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784788437/mobilehereo_lkqweh.png";

// decorative divider

export const decorativeDivider =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784469193/decorative_Divider_1_dsqk09.png";
export const badgeOrnament =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784546318/badge_ardoment_hwzvqz.png";

export const hennessyLogo =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784784438/image_23_kj73da.png";
export const chamdorLogo =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784784581/image_25_rclwv6.png";
export const evaLogo = "/assets/brands/eva.png";
export const johnnieWalkerLogo =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784784640/image_24_jwixdb.png";

export const brandDivider =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784784710/Group_1_qjk9jy.png";
export const topFlourishOrnament =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784762751/Group_wfssz0.png";

// category grid

export const categoryHeaderDivider =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784791945/Group_2_gistev.png";

export const champagneImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784792766/champange_bukmp4.png";
export const sweetwineImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784802773/Image_qs1ex3.png";
export const whiskeyImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784802920/Image_1_nsdp2h.png";
export const cognacImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784803007/Image_2_xcjlsy.png";
export const tequilaImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784803138/Image_3_jcvz6e.png";
export const rumImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784803194/Image_4_z8kfyz.png";

export const products: Product[] = [
    {
        id: "1",
        name: "Moet & Chandon Imperial Brut",
        category: "Beer",
        volume: "500ml",
        piecesLeft: 12,
        casesLeft: 5,
        price: 350,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813213/p_1_pndwco.png",
        isFeatured: true,
    },
    {
        id: "2",
        name: "Craft Pilsner Can",
        category: "Beer",
        volume: "330ml",
        piecesLeft: 8,
        casesLeft: 3,
        price: 280,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813213/p_2_wyfdyq.png",
    },
    {
        id: "3",
        name: "Premium Lager Bottle",
        category: "Beer",
        volume: "600ml",
        piecesLeft: 0,
        casesLeft: 0,
        price: 420,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_3_bmhinc.png",
    },
    {
        id: "4",
        name: "Artisan Stout Can",
        category: "Beer",
        volume: "330ml",
        piecesLeft: 20,
        casesLeft: 10,
        price: 380,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_4_ga8oeh.png",
    },
    {
        id: "5",
        name: "Vintage Aged Whiskey",
        category: "Whiskey",
        volume: "750ml",
        piecesLeft: 15,
        casesLeft: 4,
        price: 1250,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_5_ohp3t7.png",
        isFeatured: true,
    },
    {
        id: "6",
        name: "Prestige Grand Cognac",
        category: "Cognac",
        volume: "700ml",
        piecesLeft: 6,
        casesLeft: 2,
        price: 1800,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_6_eph9tv.png",
    },
    {
        id: "7",
        name: "Imperial Brut Champagne",
        category: "Champagne",
        volume: "750ml",
        piecesLeft: 10,
        casesLeft: 3,
        price: 1450,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_7_bsy5mg.png",
        isFeatured: true,
    },
    {
        id: "8",
        name: "Reposado Gold Tequila",
        category: "Tequila",
        volume: "750ml",
        piecesLeft: 14,
        casesLeft: 6,
        price: 980,
        image: "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784813212/p_8_zk4ynx.png",
    },
];

export const categories = [
    {
        title: "Champagne",
        image: champagneImg,
        href: "/catalog?category=champagne",
    },
    {
        title: "Sweetwine",
        image: sweetwineImg,
        href: "/catalog?category=sweetwine",
    },
    {
        title: "Whiskey",
        image: whiskeyImg,
        href: "/catalog?category=whiskey",
    },
    { title: "Cognac", image: cognacImg, href: "/catalog?category=cognac" },
    {
        title: "Tequila",
        image: tequilaImg,
        href: "/catalog?category=tequila",
    },
    { title: "Rum", image: rumImg, href: "/catalog?category=rum" },
];

export const glenfiddichLogo = "/icon/I_1.svg";
export const domPerignonLogo = "/icon/I_2.svg";
export const veuveClicquotLogo = "/icon/I_3.svg";
export const moetLogo = "/icon/I_4.svg";

export const donJulioLogo = "/icon/I_5.svg";
export const claseAzulLogo = "/icon/I_6.svg";
export const tequilaLogo = "/icon/I_7.svg";

export const donJulioReposadoImg = "/icon/p_1.svg";
export const hennessyXoImg = "/icon/p_2.svg";
export const claseAzulImg = "/icon/p_3.svg";

export const aboutSplashImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1784980140/glass_zkobvg.png";

export const contactChampagneImg =
    "https://res.cloudinary.com/dzk1a6bjt/image/upload/v1785057214/image_35_i4k23o.png";
```

## File: src/components/home/Home.tsx

```typescript
import { AboutSection } from "./AboutSection";
import { BestSellers } from "./BestSellers";
import { BrandBanner } from "./BrandBanner";
import { CategoryGrid } from "./CategoryGrid";
import { ContactSection } from "./ContactSection";
import { FaqSection } from "./FaqSection";
import { Hero } from "./Hero";
import { IconicBrands } from "./IconicBrands";
import { RoseiyDifference } from "./RoseiyDifference";
import { SignatureSelections } from "./SignatureSelections";
import { TestimonialsSection } from "./TestimonialsSection";
import { motion } from "framer-motion";
const Home = () => {
    return (
        <div className="relative overflow-hidden">
            <Hero />
            <div className="relative">
                {/* <img
                    src="/icon/sideDrink.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    className="block h-39 max-h-149.5 md:max-h-149.5  md:h-full  absolute -left-3 md:-left-1 top-60 md:top-38.25 z-0"
                /> */}

                <motion.img
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                        duration: 2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    src="/icon/sideDrink.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    className="block h-39 max-h-149.5 md:max-h-149.5 md:h-full absolute -left-3 md:-left-1 top-60 md:top-38.25 z-0"
                />
                <BrandBanner />
                <CategoryGrid />
            </div>
            <div className="relative">
                <motion.img
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                        duration: 2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    // src="/icon/sideDrink.png"
                    src="/icon/sideGlass.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    className="absolute max-h-73.75 -top-28 -right-10 md:max-h-177 md:-right-1 z-0"
                />
                <SignatureSelections />
            </div>
            <RoseiyDifference />
            <div className="relative">
                <motion.img
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                        duration: 2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    // src="/icon/sideDrink.png"
                    // src="/icon/sideDrink.svg"
                    alt="side drinks"
                    src="/icon/glassCup.png"
                    // src="/icon/sideDrink.svg"
                    // alt="side drinks"
                    className="absolute max-h-45.75 -top-12 md:-top-52 -left-4 md:max-h-152 md:-left-1 z-0"
                />

                <IconicBrands />
            </div>
            <BestSellers />
            <AboutSection />
            <TestimonialsSection />
            <FaqSection />
            <ContactSection />
        </div>
    );
};

export default Home;
```
