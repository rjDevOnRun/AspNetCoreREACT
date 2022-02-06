using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Data.SqlClient;
using WebAPI.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _hostEnvironment;
        private string sqlDbSource = string.Empty;

        public EmployeeController(
            IConfiguration configuration,
            IWebHostEnvironment hostEnvironment)
        {
            _configuration = configuration;
            _hostEnvironment = hostEnvironment;
            sqlDbSource = _configuration.GetConnectionString("ReactEmpDB");
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.Employee";
            DataTable table = new DataTable();

            SqlDataReader dataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDbSource))
            {
                try
                {
                    sqlConnection.Open();
                    using (SqlCommand command = new SqlCommand(query, sqlConnection))
                    {
                        dataReader = command.ExecuteReader();
                        table.Load(dataReader);
                        sqlConnection.Close();
                    }
                }
                catch (System.Exception ex)
                {
                    System.Console.WriteLine(ex.Message);
                    if (sqlConnection.State == ConnectionState.Open)
                        sqlConnection.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            string query = $"insert into dbo.Employee " +
                $"(EmployeeName, Department, DateOfJoining, PhotoFileName)" +
                $"values " +
                $"('{emp.EmployeeName}', '{emp.Department}', " +
                $"'{emp.DateOfJoining}', '{emp.PhotoFileName}')";

            DataTable table = new DataTable();
            string returnStatus = "Added Successfully";

            SqlDataReader dataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDbSource))
            {
                try
                {
                    sqlConnection.Open();
                    using (SqlCommand command = new SqlCommand(query, sqlConnection))
                    {
                        dataReader = command.ExecuteReader();
                        table.Load(dataReader);
                        sqlConnection.Close();
                    }
                }
                catch (System.Exception ex)
                {
                    System.Console.WriteLine(ex.Message);
                    if (sqlConnection.State == ConnectionState.Open)
                        sqlConnection.Close();
                    returnStatus = ex.Message + ex.StackTrace;
                }
            }

            return new JsonResult(returnStatus);
        }

        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            string query = $"update dbo.Employee set " +
                $"EmployeeName = '{emp.EmployeeName}' " +
                $", Department = '{emp.Department}' " +
                $", DateOfJoining = '{emp.DateOfJoining}' " +
                $", PhotoFileName = '{emp.PhotoFileName}' " +
                $" where EmployeeId = {emp.EmployeeId};";

            DataTable table = new DataTable();
            string returnStatus = "Updated Successfully";

            SqlDataReader dataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDbSource))
            {
                try
                {
                    sqlConnection.Open();
                    using (SqlCommand command = new SqlCommand(query, sqlConnection))
                    {
                        dataReader = command.ExecuteReader();
                        table.Load(dataReader);
                        sqlConnection.Close();
                    }
                }
                catch (System.Exception ex)
                {
                    System.Console.WriteLine(ex.Message);
                    if (sqlConnection.State == ConnectionState.Open)
                        sqlConnection.Close();
                    returnStatus = ex.Message + ex.StackTrace;
                }
            }

            return new JsonResult(returnStatus);
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = $"delete from dbo.Employee where EmployeeId = {id};";

            DataTable table = new DataTable();
            string returnStatus = "Deleted Successfully";

            SqlDataReader dataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDbSource))
            {
                try
                {
                    sqlConnection.Open();
                    using (SqlCommand command = new SqlCommand(query, sqlConnection))
                    {
                        dataReader = command.ExecuteReader();
                        table.Load(dataReader);
                        sqlConnection.Close();
                    }
                }
                catch (System.Exception ex)
                {
                    System.Console.WriteLine(ex.Message);
                    if (sqlConnection.State == ConnectionState.Open)
                        sqlConnection.Close();
                    returnStatus = ex.Message + ex.StackTrace;
                }
            }

            return new JsonResult(returnStatus);
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                // get the request form
                var httpRequest = Request.Form;

                // caputre for first file from request form
                var postedFile = httpRequest.Files[0];

                string filename = postedFile.FileName;

                // Must have the hosting enviroment set
                var physicalPath = _hostEnvironment.ContentRootPath + "/Photos/" + filename;

                // Upload to file stream
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine(ex.Message);
                return new JsonResult("anonymous.png");
            }
        }

        [Route("GetAllDepartmentNames")]
        public JsonResult GetAllDepartmentNames()
        {
            string query = @"select DepartmentName from dbo.Department";
            DataTable table = new DataTable();

            SqlDataReader dataReader;
            using (SqlConnection sqlConnection = new SqlConnection(sqlDbSource))
            {
                try
                {
                    sqlConnection.Open();
                    using (SqlCommand command = new SqlCommand(query, sqlConnection))
                    {
                        dataReader = command.ExecuteReader();
                        table.Load(dataReader);
                        sqlConnection.Close();
                    }
                }
                catch (System.Exception ex)
                {
                    System.Console.WriteLine(ex.Message);
                    if (sqlConnection.State == ConnectionState.Open)
                        sqlConnection.Close();
                }
            }

            return new JsonResult(table);
        }

    }
}
