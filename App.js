import React, { useState } from 'react';

function ProfileInfo({ username, age, studyingIn, branch }) {
  return (
    <div>
      <h3>Name: {username}</h3>
      <p>Age: {age}</p>
      <p>Studying In: {studyingIn}</p>
      <p>Branch: {branch}</p>
    </div>
  );
}

function ProfileIcon({ username, age, studyingIn, branch }) {
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const toggleProfileInfo = () => {
    setShowProfileInfo(!showProfileInfo);
  };

  return (
    <div>
      <button onClick={toggleProfileInfo}>Profile</button>
      {showProfileInfo && (
        <div>
          <ProfileInfo username={username} age={age} studyingIn={studyingIn} branch={branch} />
        </div>
      )}
    </div>
  );
}

function CourseDetails({ course, onEditContent, onAddResource, onAddAssignment }) {
  const [showContent, setShowContent] = useState(false);
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(course.content);
  const [resourceName, setResourceName] = useState('');
  const [assignmentName, setAssignmentName] = useState('');

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  const handleResourceNameChange = (event) => {
    setResourceName(event.target.value);
  };

  const handleAssignmentNameChange = (event) => {
    setAssignmentName(event.target.value);
  };

  const handleSave = () => {
    if (password === 'devbits2024') {
      onEditContent(course.id, editedContent);
      setEditMode(false);
      setPassword('');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handleAddResource = () => {
    if (password === 'devbits2024') {
      const resource = {
        id: Date.now(),
        name: resourceName,
      };
      onAddResource(course.id, resource);
      setResourceName('');
      setPassword('');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handleAddAssignment = () => {
    if (password === 'devbits2024') {
      const assignment = {
        id: Date.now(),
        name: assignmentName,
      };
      onAddAssignment(course.id, assignment);
      setAssignmentName('');
      setPassword('');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div>
      <h4 onClick={toggleContent} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
        {course.name}
      </h4>
      {showContent && (
        <div>
          <p>{editMode ? <textarea value={editedContent} onChange={handleContentChange} /> : course.content}</p>
          {editMode && (
            <>
              <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
              </label>
              <button onClick={handleSave}>Save</button>
            </>
          )}
          <div>
            <h5>Add Resource:</h5>
            <label>
              Name:
              <input type="text" value={resourceName} onChange={handleResourceNameChange} />
            </label>
            <button onClick={handleAddResource}>Add Resource</button>
          </div>
          <div>
            <h5>Add Assignment:</h5>
            <label>
              Name:
              <input type="text" value={assignmentName} onChange={handleAssignmentNameChange} />
            </label>
            <button onClick={handleAddAssignment}>Add Assignment</button>
          </div>
        </div>
      )}
      {!editMode && <button onClick={handleEdit}>Edit Content</button>}
      <div>
        <h5>Resources:</h5>
        <ul>
          {course.resources.map((resource) => (
            <li key={resource.id}>{resource.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5>Assignments:</h5>
        <ul>
          {course.assignments.map((assignment) => (
            <li key={assignment.id}>{assignment.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Profile({ username, enrolledCourses, onUnenrollCourse, onEditContent, onAddResource, onAddAssignment }) {
  const handleUnenroll = (course) => {
    onUnenrollCourse(course);
  };

  return (
    <div>
      <h2>Courses Enrolled In:</h2>
      <ul>
        {enrolledCourses.map((course) => (
          <li key={course.id}>
            <button onClick={() => handleUnenroll(course)}>Unenroll</button>
            <CourseDetails
              course={course}
              onEditContent={onEditContent}
              onAddResource={onAddResource}
              onAddAssignment={onAddAssignment}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    studyingIn: '',
    branch: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Age:
        <input type="text" name="age" value={formData.age} onChange={handleChange} />
      </label>
      <label>
        Studying In:
        <input type="text" name="studyingIn" value={formData.studyingIn} onChange={handleChange} />
      </label>
      <label>
        Branch:
        <input type="text" name="branch" value={formData.branch} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

function LoginPage({ onLogin }) {
  return (
    <div className="loginPage">
      <LoginForm onSubmit={onLogin} />
    </div>
  );
}

function StudentDashboard({ availableCourses, enrolledCourses, onEnrollCourse, onAddCourse }) {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [password, setPassword] = useState('');
  const [courseName, setCourseName] = useState('');

  const handleAddCourseClick = () => {
    setShowAddCourse(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleAddCourseSubmit = () => {
    if (password === 'devbits2024') {
      onAddCourse({ id: Date.now(), name: courseName, content: '', resources: [], assignments: [] });
      setCourseName('');
      setPassword('');
      setShowAddCourse(false); // Close the form after submitting
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handleEnrollCourse = (course) => {
    onEnrollCourse(course);
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      {showAddCourse ? (
        <div>
          <label>
            Enter Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <label>
            Course Name:
            <input type="text" value={courseName} onChange={handleCourseNameChange} />
          </label>
          <button onClick={handleAddCourseSubmit}>Add Course</button>
        </div>
      ) : (
        <>
          <h3>Available Courses:</h3>
          <ul>
            {availableCourses.map((course) => (
              <li key={course.id}>
                {course.name}
                <button onClick={() => handleEnrollCourse(course)}>Enroll</button>
              </li>
            ))}
          </ul>
          <button onClick={handleAddCourseClick}>Add Course</button>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [studyingIn, setStudyingIn] = useState('');
  const [branch, setBranch] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([
    { id: 1, name: 'Course 1', content: '', resources: [], assignments: [] },
    { id: 2, name: 'Course 2', content: '', resources: [], assignments: [] },
    { id: 3, name: 'Course 3', content: '', resources: [], assignments: [] },
  ]);

  const handleLoginSubmit = (formData) => {
    setUsername(formData.username);
    setAge(formData.age);
    setStudyingIn(formData.studyingIn);
    setBranch(formData.branch);
  };

  const handleEnrollCourse = (course) => {
    setEnrolledCourses((prevCourses) => [...prevCourses, course]);
    setAvailableCourses((prevCourses) => prevCourses.filter((c) => c.id !== course.id));
  };

  const handleUnenrollCourse = (course) => {
    setEnrolledCourses((prevCourses) => prevCourses.filter((c) => c.id !== course.id));
    setAvailableCourses((prevCourses) => [...prevCourses, course]);
  };

  const handleEditContent = (courseId, content) => {
    setEnrolledCourses((prevCourses) =>
      prevCourses.map((course) => (course.id === courseId ? { ...course, content: content } : course))
    );
  };

  const handleAddResource = (courseId, resource) => {
    setEnrolledCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, resources: [...course.resources, resource] } : course
      )
    );
  };

  const handleAddAssignment = (courseId, assignment) => {
    setEnrolledCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, assignments: [...course.assignments, assignment] } : course
      )
    );
  };

  const handleAddCourse = (course) => {
    setAvailableCourses((prevCourses) => [...prevCourses, course]);
  };

  return (
    <div>
      {username ? (
        <div>
          <button onClick={() => setUsername('')}>Logout</button>
          <ProfileIcon username={username} age={age} studyingIn={studyingIn} branch={branch} />
          <Profile
            username={username}
            enrolledCourses={enrolledCourses}
            onUnenrollCourse={handleUnenrollCourse}
            onEditContent={handleEditContent}
            onAddResource={handleAddResource}
            onAddAssignment={handleAddAssignment}
          />
          <StudentDashboard
            availableCourses={availableCourses}
            enrolledCourses={enrolledCourses}
            onEnrollCourse={handleEnrollCourse}
            onAddCourse={handleAddCourse}
          />
        </div>
      ) : (
        <LoginPage onLogin={handleLoginSubmit} />
      )}
    </div>
  );
}