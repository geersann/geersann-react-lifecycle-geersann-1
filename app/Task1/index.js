import React, { Component } from "react";

export default class Task1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/list')
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network not responding');
                }
                return response.json();
            })
            .then(list => this.setState({ list, loading: false }))
            .catch(error => this.setState({ error, loading: false }));
    }

    render() {
        const { list, loading, error } = this.state;

        if (loading) {
            return (
                <div className='block2' 
                     style={{ borderStyle: 'solid', borderWidth: '1px'}}>
                    Loading...
                </div>
            );
        }

        if (error) {
            return <div className='block2'>Error: {error.message}</div>;
        }

        return (
            <div className='block1'>
                <h1>Show List</h1>
                <ul>
                    {list.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.note}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}