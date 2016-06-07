using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WeiXinUI.Startup))]
namespace WeiXinUI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
