const var1 = `
CREDITS

Overview

This platform was designed, developed, and maintained as a lightweight, browser-based homework sharing and information distribution system. Its purpose is to provide a centralized, predictable, and low-friction environment where students can view assignments, notices, and related educational materials without the overhead and complexity of a full learning management system.

The platform prioritizes simplicity, clarity, and reliability over feature density. It is intentionally minimal by design, aiming to reduce distractions, eliminate unnecessary interactions, and focus solely on information delivery.

Philosophy and Intent

The guiding philosophy behind this project is that educational tools should assist learning rather than complicate it. Many modern platforms introduce excessive layers of automation, tracking, and enforcement that may unintentionally increase stress or cognitive load. This platform takes the opposite approach.

There are no engagement metrics, no activity tracking, no submission enforcement, and no behavioral analysis. The system exists purely as a reference point. Whether assignments are completed or not remains the responsibility of the student.

This design choice is deliberate and reflects the belief that responsibility, accountability, and learning outcomes should remain human-centered rather than algorithm-driven.

Concept, Architecture, and Development

The conceptual design, system architecture, and implementation were created by the platform author. Development followed an iterative approach, with features added only when they contributed meaningfully to usability, stability, or clarity.

Rather than building a complex backend infrastructure, the platform was designed to operate entirely within the constraints of static hosting. This decision reduces operational complexity, minimizes attack surfaces, and improves reliability.

The platform is structured around clear separation of concerns:
- Presentation is handled by HTML and CSS
- Interactivity and dynamic behavior are handled by JavaScript
- Data is represented in simple, human-readable formats

This architecture ensures that the platform remains understandable, maintainable, and modifiable even as it evolves.

Technology Stack

This platform is built entirely using standard, widely supported web technologies:

HTML is used to define document structure and content hierarchy.
CSS is used to manage layout, typography, spacing, and visual consistency.
JavaScript is used to implement dynamic content updates, interactivity, and basic access control logic.

No proprietary frameworks are required to understand or modify the platform. All code is written with readability and simplicity in mind.

Hosting and Deployment

The platform is hosted using GitHub Pages. This hosting method allows the platform to be served over standard HTTPS without the need for a dedicated backend server or runtime environment.

All logic executes client-side in the user’s browser. No server-side processing, databases, or APIs are involved in normal operation.

This deployment model ensures high availability, low maintenance overhead, and predictable behavior across environments.

Security Design Considerations

Security within this platform is approached through simplicity and risk reduction rather than complexity. The system avoids collecting or storing sensitive personal information wherever possible.

Login functionality is implemented solely for basic access control and user experience separation. It is not intended to function as a high-security authentication system.

Passwords are processed using salted hashing techniques. Plaintext passwords are never stored. Salts are generated randomly and stored alongside hashed values as required for verification.

All security mechanisms are designed with the understanding that client-side code is inherently inspectable. As such, the platform minimizes the impact of potential misuse by ensuring that no sensitive data or privileged operations are exposed.

Privacy Considerations

This platform does not collect personal analytics, usage metrics, or behavioral data. No advertising technologies are used. No third-party tracking scripts are embedded.

Any data stored locally within the user’s browser is used exclusively to support session-related functionality and basic user experience improvements. This data is not transmitted to external servers.

The platform does not monitor user behavior, interaction patterns, or content consumption. Privacy is preserved by design rather than through policy alone.

Content Responsibility

Homework assignments, announcements, and external links displayed on the platform are provided by teachers or administrators. The platform itself does not generate educational content.

The accuracy, relevance, and appropriateness of posted materials remain the responsibility of the content providers. The platform serves only as a delivery mechanism.

External links may lead to third-party websites outside the control of this platform. The platform does not guarantee the availability, accuracy, or safety of external content.

User Responsibilities

Students are responsible for checking assignments, managing deadlines, and completing work as required. The platform does not enforce completion, submission, or compliance.

Teachers are responsible for ensuring that posted materials are accurate, up to date, and clearly communicated.

Users are expected to use the platform responsibly and in accordance with applicable school policies and guidelines.

Limitations and Scope

This platform is not intended to replace full learning management systems, grading platforms, or communication tools. It does not provide messaging, file submission, grading, or progress tracking functionality.

These limitations are intentional and reflect the platform’s focused scope. By limiting functionality, the platform remains stable, predictable, and easy to use.

Maintenance and Updates

The platform may be updated, modified, or discontinued at any time without prior notice. Updates may include bug fixes, performance improvements, or minor feature enhancements.

There is no guarantee of long-term availability, backward compatibility, or feature permanence.

Acknowledgements

This project is made possible by open web standards and the availability of modern browser APIs. Credit is due to the broader web development and open-source communities whose documentation, tooling, and shared knowledge enable projects of this nature.

The platform also benefits from the continued evolution of browser security models and web platform capabilities.

Final Notes

This platform is provided on an “as-is” basis for educational and informational purposes. No warranties are expressed or implied.

By using this platform, users acknowledge its limitations and accept responsibility for their own actions and decisions.

End of Credits
`
const LINES_VISIBLE = 20;
const SCROLL_INTERVAL = 1200;

const lines = creditsText.trim().split("\n");
let offset = 0;

function render() {
  let output = [];

  for (let i = 0; i < LINES_VISIBLE; i++) {
    const lineIndex = offset + i;
    if (lineIndex < lines.length) {
      output.push(lines[lineIndex]);
    } else {
      output.push(""); // blank line when out of text
    }
  }

  document.getElementById("creditsText").textContent =
    output.join("\n");
}

function roll() {
  offset++;

  // stop when the top line has fully scrolled past the end
  if (offset > lines.length) {
    clearInterval(timer);
    return;
  }

  render();
}

// initial render
render();

// start rolling
const timer = setInterval(roll, SCROLL_INTERVAL);
