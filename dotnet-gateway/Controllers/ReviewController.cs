using DevReviewGateway.Models;
using DevReviewGateway.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevReviewGateway.Controllers;

[ApiController]
[Route("api/review")]
public class ReviewController : ControllerBase
{
    private readonly PythonReviewClient _client;

    public ReviewController(
        PythonReviewClient client)
    {
        _client = client;
    }

    [HttpPost]
    public async Task<IActionResult> Review(
        ReviewRequest request)
    {
        var result =
            await _client.ReviewAsync(request);

        return Ok(result);
    }
    [HttpPost("stream")]
    public async Task Stream(
     ReviewRequest request)
    {
        var stream =
            await _client.ReviewStreamAsync(request);

        Response.ContentType = "text/plain";

        var buffer = new byte[1024];

        while (true)
        {
            var bytesRead =
                await stream.ReadAsync(buffer);

            if (bytesRead == 0)
                break;

            await Response.Body.WriteAsync(
                buffer.AsMemory(0, bytesRead));

            await Response.Body.FlushAsync();
        }
    }
}