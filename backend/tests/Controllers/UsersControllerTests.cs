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
        string url = "/api/auth/login";
        var user = new
        {
            Id = 0,
            Email = "test@test.com",
            Password = "123456",
            Organization = "Testdepartementet"
        };

        var jsonData = JsonConvert.SerializeObject(user);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        HttpClient client = GetTestClient();
        var response = await client.PostAsync(url, content);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Post_LoginReturnsBadRequest()
    {
        string url = "/api/auth/login";
        var user = new
        {
            Id = 0,
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

    [Fact]
    public async Task Post_SignupReturnsOk()
    {
        string url = "/api/auth/signup";
        var user = new
        {
            Id = 0,
            Email = "test@test.com",
            Password = "123456",
            Organization = "Testdepartementet"
        };

        var jsonData = JsonConvert.SerializeObject(user);
        var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        HttpClient client = GetTestClient();
        var response = await client.PostAsync(url, content);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Post_SignupReturnsBadRequest()
    {
        string url = "/api/auth/signup";
        var user = new
        {
            Id = 0,
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