// @flow

const getBannerLine = (bannerSignature: string, bannerSymbol: string = '*', bannerThickness: number = 3): string => {
    const bannerSize = bannerSignature.length + (bannerThickness * 2) + 4;
    return `${(new Array(bannerSize + 1)).join(bannerSymbol)}`;
};

export default (
    bannerSignature: string,
    bannerSymbol: string = '*',
    bannerThickness: number = 3,
): string => {
    const bannerLine = getBannerLine(bannerSignature, bannerSymbol);
    const bannerLinePrefix = '  * ';
    const bannerBuffer = (new Array(bannerThickness - 1)).join(`${bannerLinePrefix}${bannerLine}\n`);
    const bannerGutter = (new Array(bannerThickness + 1)).join(bannerSymbol);
    const bannerEmptyLine = `${bannerLinePrefix}${bannerGutter}${(new Array(bannerSignature.length + 5)).join(' ')}${bannerGutter}\n`;
    const bannerTextLine = `${bannerLinePrefix}${bannerGutter}  ${bannerSignature}  ${bannerGutter}\n`;
    return `/** ${bannerLine}\n${bannerBuffer}${bannerEmptyLine}${bannerTextLine}${bannerEmptyLine}${bannerBuffer}${bannerLinePrefix}${bannerLine} */\n`;
};
