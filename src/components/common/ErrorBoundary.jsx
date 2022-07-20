import { Component } from 'react';

import Dialog from './Dialog';

class ErrorBoundary extends Component {
    state = { error: null };

    componentDidCatch(e) {
        this.setState({ error: e.message })
    }

    render() {
        const { error } = this.state;
        if (!error) return this.props.children;

        return (
            <Dialog
                title="Error!"
                open
            >
                {error}
            </Dialog>
        );
    }
}

export default ErrorBoundary;