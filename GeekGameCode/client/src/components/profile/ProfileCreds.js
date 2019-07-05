import React, { Component } from 'react'


class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    // 遍历，Education 和Education都是数组
    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          {exp.from} to {exp.to === '' ? 'now' : exp.to}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          {exp.location === '' ? null : (
            <span>
              <strong>Location: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === '' ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          {edu.from} to {edu.to === '' ? 'now' : edu.to}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === '' ? null : (
            <span>
              <strong>Introduction: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Work Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
              <p className="text-center">Sorry, there is nothing</p>
            )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Introduction of contribution</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
              <p className="text-center">Sorry, there is nothing</p>
            )}
        </div>
      </div>
    )
  }
}
export default ProfileCreds;