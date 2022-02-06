using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Data.SqlClient;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string sqlDbSource = string.Empty;

        public DepartmentController(IConfiguration configuration)
        {
            _configuration = configuration;
            sqlDbSource = _configuration.GetConnectionString("ReactEmpDB");
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.Department";
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
                    if(sqlConnection.State == ConnectionState.Open)
                        sqlConnection.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Department department)
        {
            string query = $"insert into dbo.Department values " +
                $"('{department.DepartmentName}')";

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
        public JsonResult Put(Department department)
        {
            string query = $"update dbo.Department set DepartmentName = " +
                $"('{department.DepartmentName}')" +
                $" where DepartmentId = {department.DepartmentId};";

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
            string query = $"delete from dbo.Department where DepartmentId = {id};";

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
    }
}
