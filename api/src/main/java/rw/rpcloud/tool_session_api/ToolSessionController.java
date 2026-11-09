package rw.rpcloud.tool_session_api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ToolSessionController {

	@GetMapping("/health")
	public HealthResponse health() {
		return new HealthResponse("UP");
	}

	@PostMapping("/sessions")
	public SessionResponse requestSession(@RequestBody SessionRequest request) {
		return new SessionResponse(true, "PENDING", "Your session request has been received.");
	}

	public record HealthResponse(String status) {
	}
}
