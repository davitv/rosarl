const markdownToPlainText = require('remove-markdown');

import * as classNames from 'classnames';
import * as marked from 'marked';

const getClientRectangle = (el: HTMLElement) => el.getBoundingClientRect();

export const getElementPosition = (el: HTMLDivElement): [number, number] => {
    const rect = getClientRectangle(el);
    return [rect.left, rect.top];
};

export const getElementHeight = (el: HTMLDivElement): number => getClientRectangle(el).height;
export const getElementWidth = (el: HTMLDivElement): number => getClientRectangle(el).width;
export const getDisplayHeight = (): number => (document.documentElement as HTMLElement).clientHeight as number;
export const createMarkup = (html: string) => ({__html: html});


export const markdownToText = (mdText: string) => markdownToPlainText(mdText, {
    stripListLeaders: true , // strip list leaders (default: true)
    listUnicodeChar: '',     // char to insert instead of stripped list leaders (default: '')
    gfm: true,              // support GitHub-Flavored Markdown (default: true)
    useImgAltText: true      // replace images with alt-text, if present (default: true)
});

export const markdownToHTML = marked;

export { classNames as cls };