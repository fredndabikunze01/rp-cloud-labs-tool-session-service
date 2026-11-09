import { useState } from 'react';

const initialForm = { studentId: '', college: '', tool: '' };

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [requestResult, setRequestResult] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submitRequest(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `Request failed (${response.status}).`);
      }

      setRequestResult({ ...result, studentId: form.studentId, tool: form.tool });
    } catch (requestError) {
      setError(requestError.message || 'Unable to send the request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function returnToDashboard() {
    setRequestResult(null);
    setError('');
    setForm(initialForm);
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>RP-Cloud <strong>Labs</strong></span>
        </a>
        <span className="student-label">Student portal</span>
      </header>

      <section className="content">
        <p className="eyebrow">LEARNING TOOLS</p>
        {requestResult ? (
          <section className="card confirmation" aria-labelledby="confirmation-title">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h1 id="confirmation-title">Request received</h1>
            <p className="intro">Your tool session request has been submitted.</p>
            <dl className="details">
              <div><dt>Student ID</dt><dd>{requestResult.studentId}</dd></div>
              <div><dt>Learning tool</dt><dd>{requestResult.tool}</dd></div>
              <div><dt>Request status</dt><dd><span className="status">{requestResult.status}</span></dd></div>
            </dl>
            <p className="response-message" role="status">{requestResult.message}</p>
            <button className="primary-button" type="button" onClick={returnToDashboard}>
              Return to dashboard
            </button>
          </section>
        ) : (
          <>
            <h1>Request a tool session</h1>
            <p className="intro">Choose a learning tool to get started with your coursework.</p>
            <form className="card request-form" onSubmit={submitRequest}>
              <label htmlFor="studentId">Student ID</label>
              <input
                autoComplete="username"
                id="studentId"
                name="studentId"
                onChange={updateForm}
                placeholder="Enter your student ID"
                required
                value={form.studentId}
              />

              <label htmlFor="college">College</label>
              <select id="college" name="college" onChange={updateForm} required value={form.college}>
                <option disabled value="">Select your college</option>
                <option>College of Science and Technology</option>
                <option>College of Business and Economics</option>
                <option>College of Education</option>
                <option>Other</option>
              </select>

              <label htmlFor="tool">Learning tool</label>
              <select id="tool" name="tool" onChange={updateForm} required value={form.tool}>
                <option disabled value="">Select a learning tool</option>
                <option>MATLAB</option>
                <option>AutoCAD</option>
                <option>Visual Studio</option>
                <option>Other</option>
              </select>

              {error && <p className="error-message" role="alert">{error}</p>}

              <button className="primary-button" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Sending request…' : 'Request session'}
              </button>
              <p className="form-note">Your request status will appear after submission.</p>
            </form>
          </>
        )}
      </section>
      <footer>RP-Cloud Labs · Rwanda Polytechnic</footer>
    </main>
  );
}
