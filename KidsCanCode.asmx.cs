using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace KidsCanCode
{
    /// <summary>
    /// Summary description for KidsCanCode
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class KidsCanCode : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public void VerifyCaptcha(string secret, string token)
        {
            //Make a request to verify reCaptcha
            WebRequest request = WebRequest.Create(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secret, token));
            request.Method = "POST";
            request.ContentType = "application/javascript";
            Stream dataStream = request.GetRequestStream();
            dataStream.Close();

            //Make a new response for your validation request.
            WebResponse response = request.GetResponse();
            dataStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(dataStream);
            string responseFromServer = reader.ReadToEnd();
            reader.Close();
            dataStream.Close();
            response.Close();

            //Write the response.
            dataStream.Dispose();
            HttpContext.Current.Response.Write(responseFromServer);
        }
    }
}
