/* eslint-disable no-irregular-whitespace */

import type { ReactNode } from "react";
import { createThemeProvider, defaultGetTypography } from "onyxia-ui/lib";
import { createMakeStyles } from "tss-react";
import { createIcon } from "onyxia-ui/Icon";
import { createIconButton } from "onyxia-ui/IconButton";
import { createButton } from "onyxia-ui/Button";

import IconButtonIcon from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Brightness1RoundedIcon from "@material-ui/icons/Brightness1Rounded";
import type { ThemeProviderProps, Theme } from "onyxia-ui";

let isThemeOverwritten = false;

let { ThemeProvider, useTheme } = createThemeProvider({
    "getTypography": ({ windowInnerWidth }) => ({
        ...defaultGetTypography({ windowInnerWidth }),
        "fontFamily": '"Work Sans", sans-serif',
    }),
});

let { makeStyles } = createMakeStyles({ useTheme });

export function overwriteTheme(params: {
    ThemeProvider(props: ThemeProviderProps): JSX.Element;
    useTheme(): Theme;
}): void {
    isThemeOverwritten = true;

    ThemeProvider = params.ThemeProvider;
    useTheme = params.useTheme;
    makeStyles = createMakeStyles({
        useTheme,
    }).makeStyles;
}

export const { getThemeApi } = (() => {
    const Id: typeof ThemeProvider = (props: { children: ReactNode }) => (
        <>{props.children}</>
    );

    function getThemeApi() {
        return {
            "ThemeProviderOrId": isThemeOverwritten ? Id : ThemeProvider,
            useTheme,
            makeStyles,
        };
    }

    return { getThemeApi };
})();

export const { Icon } = createIcon({
    "iconButton": IconButtonIcon,
    "brightness4": Brightness4Icon,
    "brightness7": Brightness7Icon,
    "arrowBackIos": ArrowBackIosIcon,
    "arrowForwardIos": ArrowForwardIosIcon,
    "dehaze": DehazeIcon,
    "brightness1Rounded": Brightness1RoundedIcon,
});

export const { IconButton } = createIconButton({ Icon });

export const { Button } = createButton({ Icon });
