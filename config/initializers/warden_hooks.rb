Warden::Manager.after_set_user do |user, auth, opts|
  # scope = opts[:scope]
  auth.cookies.signed['user_id'] = user.id
end
