import React, { PureComponent } from 'react';

class Session extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                {this.props.match.params.sessionId}
            </div>
        )
    }
}

export default Session;