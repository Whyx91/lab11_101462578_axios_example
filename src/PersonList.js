import React, { Component } from 'react';
import axios from 'axios';
import './PersonList.css'; // Create this CSS file for custom styling

class PersonList extends Component {
    state = {
        persons: [],
        loading: true,
        error: null,
    };

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=9') // Fetch 9 random users to display 10 total with custom user
            .then(res => {
                const persons = res.data.results;

                // Prepend your custom user data
                const myUser = {
                    name: { title: 'Mr.', first: 'Abdulgafar', last: 'Towolawi' },
                    login: { username: 'Abdul' },
                    gender: 'male',
                    location: {
                        timezone: { description: 'Canada' },
                        street: { number: 22, name: 'John Street' },
                        city: 'Toronto',
                        state: 'Ontario',
                        country: 'Canada',
                        postcode: 'M9N 0B1'
                    },
                    email: 'abdulgafar.towolawi@georgebrown.com',
                    dob: { date: '1993-01-08T00:00:00.000Z', age: 31 },
                    phone: '(647) 268 xxxx',
                    picture: { large: 'https://via.placeholder.com/150' } // Placeholder image URL
                };

                persons.unshift(myUser); // Add your user data at the beginning
                this.setState({ persons, loading: false });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                this.setState({ error: "Error fetching data", loading: false });
            });
    }

    render() {
        const { persons, loading, error } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        return (
            <div className="user-list">
                <h2>User List</h2>
                {persons.map((person, index) => (
                    <div key={index} className="user-card">
                        <img 
                            src={person.picture?.large || 'https://via.placeholder.com/150'} 
                            alt={`${person.name.first} ${person.name.last}`} 
                        />
                        <h3>{person.name.title} {person.name.first} {person.name.last}</h3>
                        <p><strong>Username:</strong> {person.login.username}</p>
                        <p><strong>Gender:</strong> {person.gender}</p>
                        <p><strong>Time Zone:</strong> {person.location.timezone.description}</p>
                        <p><strong>Address:</strong> {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`}</p>
                        <p><strong>Email:</strong> {person.email}</p>
                        <p><strong>Birth Date:</strong> {new Date(person.dob.date).toLocaleDateString()} ({person.dob.age} years)</p>
                        <p><strong>Phone:</strong> {person.phone}</p>
                        <button className="details-button">Details</button>
                    </div>
                ))}
            </div>
        );
    }
}

export default PersonList;
