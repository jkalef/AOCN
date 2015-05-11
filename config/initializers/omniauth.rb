Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_API_KEY'], ENV['FACEBOOK_API_SECRET'],
           :scope => 'email,user_birthday,read_stream', :display => 'popup'
end