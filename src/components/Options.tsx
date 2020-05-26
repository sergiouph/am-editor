import React, { useEffect, useState } from "react";
import { RenderOptions } from "../lib/machine-formatter";

interface OptionsProps {
    options: RenderOptions
    setter: (options: RenderOptions) => void
}

export const Options = (props: OptionsProps) => {

    function onChangeIgnoreActions(e) {
        props.setter(props.options.patch({ ignoreActions: e.target.checked }))
    }

    return (
        <>
            <input id="chkIgnoreActions" type="checkbox" checked={props.options.ignoreActions} onChange={onChangeIgnoreActions} />
            <label htmlFor="chkIgnoreActions">Ignore actions</label>
        </>
    );
};
