import React, { Components } from "react";

class SayHi extends Components {
    render() {
        return (
            <div className="greeting">
                Hello, {this.props.name}!
            </div>
        );
    }
}

export default SayHi;