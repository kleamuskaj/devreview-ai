using System.Net.Http.Json;
using DevReviewGateway.Models;

namespace DevReviewGateway.Services;

public class PythonReviewClient
{
    private readonly HttpClient _httpClient;

    public PythonReviewClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ReviewResponse?> ReviewAsync(
        ReviewRequest request)
    {
        var response =
            await _httpClient.PostAsJsonAsync(
                "/review",
                request);

        response.EnsureSuccessStatusCode();

        return await response.Content
            .ReadFromJsonAsync<ReviewResponse>();
    }
    public async Task<Stream> ReviewStreamAsync(
    ReviewRequest request)
    {
       var requestMessage = new HttpRequestMessage(
    HttpMethod.Post,
    "/review-stream");

requestMessage.Content =
    JsonContent.Create(request);

var response =
    await _httpClient.SendAsync(
        requestMessage,
        HttpCompletionOption.ResponseHeadersRead);
        response.EnsureSuccessStatusCode();

        return await response.Content
            .ReadAsStreamAsync();
    }
}