// using System.Net;
// using System.Text;
// using FormAPI.Controllers;
// using FormAPI.Models;
// using Microsoft.AspNetCore.Mvc.Testing;
// using Newtonsoft.Json;
// using Xunit;
//
// namespace FormAPI.Tests.Controllers;
//
// public class FormsControllerTests(WebApplicationFactory<FormsController> formApi)
//     : IClassFixture<WebApplicationFactory<FormsController>>
//
// {
//     private readonly WebApplicationFactory<FormsController> _formApi = formApi;
//
//     private HttpClient GetTestClient()
//     {
//         return _formApi.WithWebHostBuilder(builder =>
//         {
//         }).CreateDefaultClient();
//     }
//     [Fact]
//     public async Task Get_ReturnsFormData()
//     {
//         string url = "/forms";
//         HttpClient client = GetTestClient();
//
//         var response = await client.GetAsync(url);
//         FormEntity responseObject = await response.Content.ReadAsAsync<FormEntity>();
//
//         Assert.Equal(HttpStatusCode.OK, response.StatusCode);
//         Assert.IsType<FormEntity>(responseObject);
//     }
//
//     [Fact]
//     public async Task Post_ValidModel_ReturnsFormData()
//     {
//         string url = "/forms";
//         HttpClient client = GetTestClient();
//         var form = new FormEntity { Name = "Ola Nordmann", Email = "ola@norge.no" };
//         var httpContent = new StringContent(JsonConvert.SerializeObject(form), Encoding.UTF8, "application/json");
//
//         var response = await client.PostAsync(url, httpContent);
//         var responseContent = await response.Content.ReadAsStringAsync();
//         var returnedForm = JsonConvert.DeserializeObject<FormEntity>(responseContent);
//
//         Assert.NotNull(returnedForm);
//         Assert.Equal(form.Name, returnedForm.Name);
//         Assert.Equal(form.Email, returnedForm.Email);
//     }
//
//     [Fact]
//     public async Task Post_InvalidModel_ReturnsBadRequest()
//     {
//         string url = "/forms";
//         HttpClient client = GetTestClient();
//         var invalidForm = new { InvalidField = "Test" };
//         var httpContent = new StringContent(JsonConvert.SerializeObject(invalidForm), Encoding.UTF8, "application/json");
//
//         var response = await client.PostAsync(url, httpContent);
//
//         Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
//     }
// }