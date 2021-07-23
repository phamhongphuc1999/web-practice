import { Tooltip } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from "react";

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black
    },
}));

const BaseTooltip = ({ timeout = 500, children, ...props }) => {
    const classes = useStylesBootstrap();

    return (
        <Tooltip
            TransitionProps={{ timeout: timeout }}
            classes={classes}
            placement="top"
            {...props}
        >
            {children}
        </Tooltip>
    )
}

export default memo(BaseTooltip);
