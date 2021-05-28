import { createUseClassNames } from "../useClassesNames";
import RoundedIcon from "@material-ui/icons/Brightness1Rounded";
import { useTheme } from "@material-ui/core/styles";
import { css } from "tss-react";
import { memo } from "react";

const { useClassNames } = createUseClassNames()(() => ({
    "roundedIcons": {
        "position": "absolute",
        "top": -23,
        "left": -17,
        "display": "flex",
        "& >svg": {
            "width": 15,
            "margin": "0 2px 0 2px",
        },
    },
}));

export const VsCodeButtons = memo(() => {
    const { classNames } = useClassNames({});
    const { vsCodeTopLeftButtonColors } = useTheme().custom.color.useCases;

    return (
        <div className={classNames.roundedIcons}>
            {Object.values(vsCodeTopLeftButtonColors).map(color => (
                <RoundedIcon
                    key={color}
                    className={css({
                        "fill": color,
                    })}
                />
            ))}
        </div>
    );
});