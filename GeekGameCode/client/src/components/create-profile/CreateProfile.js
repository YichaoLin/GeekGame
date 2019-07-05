import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import InputGroup from '../../common/InputGroup';
import { createProfile } from '../../actions/profileActions';
class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      facebook: '',
      twitter: '',
      instagram:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      facebook: this.state.facebook,
      twitter:this.state.twitter,
      instagram:this.state.instagram,
      // QQ: this.state.QQ,
      // tengxunkt: this.state.tengxunkt,
      // wangyikt: this.state.wangyikt,
    };



    this.props.createProfile(profileData, this.props.history);

  }

  // 生命周期函数
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Facebook"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Twitter"
            name="twitter"
            icon="fab fa-twitter-square"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
           <InputGroup
            placeholder="Instagram"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.twitter}
          />
        </div>
      );
    }

    const options = [
      { label: "* Please select your job", value: "* Please select your job" },
      { label: 'Front End Developer', value: 'Front End Developer' },
      { label: 'Back End Developer', value: 'Back End Developer' },
      { label: 'Fullstack developer', value: 'Fullstack developer' },
      { label: 'QA Engineer', value: 'QA Engineer' },
      { label: 'Student', value: 'Student' },
      { label: 'Other', value: 'Other' }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            {/* display-4  */}
              <h1 className="text-center">Add Personal information</h1>
              <p className="lead text-center">Let us know you!</p>
              <small className="d-block pb-3">* is required field</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Email"
  
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Note:the email address is usually the one you register your account!"
                  // info="此处的handle是在后端接口中需要用来查询数据的, 通常是写你email的名字"
                />

                <SelectListGroup
                  placeholder="Job"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Please add your job."
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Please add your company."
                />
                <TextFieldGroup
                  placeholder="* Your programming language "
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please seperate with ',' (For example:C,C++,Java,Go)"
                />
                <TextFieldGroup
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="If you have your own website, please add it here."
                />
                <TextFieldGroup
                  placeholder="City"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Please add the city you live"
                />
                
                <TextFieldGroup
                  placeholder="Github name"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you would like to share your projects with others, please add your Github name here"
                />

                <TextAreaFieldGroup
                  placeholder="Intruduce yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Introduce yourself and let more people know you!"
                />

                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    type="button"
                    // 这个函数的作用：每点一下displaySocialInputs的值跟当前取反
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add social account
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />

              </form>

            </div>
          </div>
        </div>
      </div >
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));