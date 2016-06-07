using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using Newtonsoft.Json;


namespace Calayr.Common
{
    public class XmlOperate
    {
        /// <summary>
        /// 返回当前月份的通知
        /// </summary>
        /// <param name="xmlPath">xml文件路径</param>
        public static string LoadXmlMenu(string xmlPath)
        {
            if (!File.Exists(xmlPath))
            {
                return string.Empty;
            }
            XmlDocument doc = new XmlDocument();
            doc.Load(xmlPath);
            string jsonText = JsonConvert.SerializeXmlNode(doc);
            return jsonText;
        }


    }
}
