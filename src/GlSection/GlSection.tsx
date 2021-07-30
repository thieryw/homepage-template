/* eslint-disable @typescript-eslint/no-namespace */
import { memo, ReactNode } from "react";

import { makeStyles, Text } from "../theme";

const useStyles = makeStyles<{
    hasArticleAndAside: boolean;
}>()((theme, { hasArticleAndAside }) => ({
    "root": {
        "position": "relative",
        "padding": theme.spacing(4, 8),
    },

    "title": {
        "textAlign": "center",
        "marginBottom": theme.spacing(10),
    },
    "articleAndAsideWrapper": {
        "display": "grid",
        "gridTemplateColumns": `repeat(${hasArticleAndAside ? 2 : 1}, 1fr)`,
        "marginTop": theme.spacing(8),
        "alignItems": "center",
        "gap": theme.spacing(8),
        "& code": {
            "width": 0,
        },
        ...(theme.responsive.down("md")
            ? {
                  "gridTemplateColumns": undefined,
                  "gridAutoFlow": "row",
              }
            : {}),
    },
}));

export type GlSectionProps = {
    className?: string;
    heading?: string;
    article?: ReactNode;
    aside?: ReactNode;
    children?: ReactNode;
};

export const GlSection = memo((props: GlSectionProps) => {
    const { className, heading, aside, article, children } = props;

    const { classes, cx } = useStyles({
        "hasArticleAndAside": aside !== undefined && article !== undefined,
    });

    return (
        <section className={cx(classes.root, className)}>
            {heading && (
                <Text className={classes.title} typo="page heading">
                    {heading}
                </Text>
            )}
            <div className={classes.articleAndAsideWrapper}>
                {article}
                {aside}
            </div>
            {children}
        </section>
    );
});
