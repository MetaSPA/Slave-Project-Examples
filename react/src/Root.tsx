import * as React from "react";
import { bootstrap } from "@metaspa/module";

class Root extends React.Component<{}, { root2: any }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            root2: null,
        };
    }

    componentDidMount() {
        this.load();
    }
    load = async () => {
        const root2 = (await import("./Root2")).default;
        this.setState({ root2 });
    };
    render() {
        const Root2 = this.state.root2;
        return (
            <>
                <div>Message From Root</div>
                <div> {Root2 && <Root2 />}</div>
            </>
        );
    }
}

bootstrap({ namespace: "TestReact", modules: Root });
