using System.Net;
using System.Text;
using FormAPI.Controllers;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Xunit;

namespace FormAPI.Tests.Controllers;

public class UsersControllerTests(WebApplicationFactory<UsersController> userApi)
    : IClassFixture<WebApplicationFactory<UsersController>>

{
    private readonly WebApplicationFactory<UsersController> _userApi = userApi;

    private HttpClient GetTestClient()
    {
        return _userApi.WithWebHostBuilder(builder =>
        {
        }).CreateDefaultClient();
    }

    [Fact]
    public async Task Post_LoginReturnsOk()
    {
        string url = "/api/users/login";
        var user = new
        {
            Email = "test@test.com",
            Password = "12345678",
            Organization = "Testdepartementet"
        };

        var jsonData = JsonConvert.SerializeObject(user);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        HttpClient client = GetTestClient();
        var response = await client.PostAsync(url, content);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Post_LoginReturnsUnauthorized()
    {
        string url = "/api/users/login";
        var user = new
        {
            Email = "emailNotInDb@email.com",
            Password = "123456",
            Organization = "Testdepartementet"
        };

        var jsonData = JsonConvert.SerializeObject(user);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        HttpClient client = GetTestClient();
        var response = await client.PostAsync(url, content);

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Post_SignupReturnsCreated()
    {
        string url = "/api/users";
        var user = new
        {
            Email = "someTestEmail@test.com",
            Password = "12345678",
            Organization = "Testdepartementet"
        };

        var jsonData = JsonConvert.SerializeObject(user);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        HttpClient client = GetTestClient();
        var response = await client.PostAsync(url, content);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    [Fact]
    public async Task Post_SignupReturnsBadRequest()
    {
        string url = "/api/users";
        var user = new
        {
            Email = "",
            Password = "123456",
            Organization = "Testdepartementet"
        };

        var jsonData = JsonConvert.SerializeObject(user);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        HttpClient client = GetTestClient();
        var response = await client.PostAsync(url, content);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}