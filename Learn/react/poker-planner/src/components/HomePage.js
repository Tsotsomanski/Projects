import React, { PureComponent } from 'react';

class HomePage extends PureComponent{
    render() {
        return(
            <div className='homepage-container'>
                <header><p>Logo</p></header>
                <div className='container'>
                    <h1 className='welcome-header'><span>Welcome to</span> Poker Planner</h1>
                    <div className='header-underline'> </div>
                    <p className='homepage-text'>Poker Planner is a online, virtual and co-located agile teams use this application
                        during their planning/pointing sessions to effectively communicate points for stories.
                        Ready to Start, just pick an action!
                    </p>
                    <div className='login-container'>
                        <div className='btn-join-session'>Join Session</div>
                        <span>or</span>
                        <div className='btn-new-session'>New Session</div>
                    </div>
                </div>
                <footer><p>Copyright © 2018 - Poker Planner</p></footer>
            </div>
        );
    }
}

export default HomePage;