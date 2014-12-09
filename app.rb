# encoding: utf-8

require 'sinatra'
require 'sinatra/js'

enable :sessions

configure do
  set :session_secret, ENV['SESSION_SECRET'] || '*&(^B234'
  set :guild_region, ENV['BNET_REGION'] || 'us'
  set :guild_realm, ENV['BNET_REALM'] || 'Stormreaver'
  set :guild_name, ENV['BNET_GUILD'] || 'Skorn'
end

# Home
get "/" do
  @title = settings.guild_name
  
  

  erb :"board/index"
end

# Error messages
get "/error/not_found.html" do
  @title = "Not Found"
  erb :"pages/not_found"
end

get "/error/application.html" do
  @title = "Application Error"
  erb :"pages/application"
end

# Global helpers
helpers do
  include Rack::Utils

  alias_method :h, :escape_html

  def title
    if @title
      "#{@title}"
    else
      "Welcome."
    end
  end
  
  def current?(path='')
    request.path_info=='/'+path ? 'active':  nil
  end
  
  def link(url='')
    request.base_url + "/" + url
  end
end

not_found do
  redirect to('/error/not_found.html')
end

error do
  #'Sorry there was a nasty error - ' + env['sinatra.error'].name
  redirect to('/error/application.html')
end


