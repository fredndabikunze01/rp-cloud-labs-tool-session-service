package rw.rpcloud.tool_session_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class ToolSessionControllerTests {

	private MockMvc mockMvc;

	@BeforeEach
	void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(new ToolSessionController()).build();
	}

	@Test
	void healthReturnsUpStatus() throws Exception {
		mockMvc.perform(get("/health"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.status").value("UP"));
	}

	@Test
	void sessionRequestReturnsPendingPlaceholder() throws Exception {
		mockMvc.perform(post("/sessions")
						.contentType(MediaType.APPLICATION_JSON)
						.content("""
								{
								  "studentId": "20240001",
								  "college": "College of Science",
								  "tool": "MATLAB"
								}
								"""))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.success").value(true))
				.andExpect(jsonPath("$.status").value("PENDING"))
				.andExpect(jsonPath("$.message").value("Your session request has been received."));
	}
}
