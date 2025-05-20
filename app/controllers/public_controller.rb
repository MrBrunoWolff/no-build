class PublicController < ActionController::Base
  def index
    # Remove the prefix from the path
    path = params[:path]
    
    # Check different locations for the file
    ["app/javascript", "app/assets"].each do |dir|
      full_path = Rails.root.join(dir, path)
      if File.exist?(full_path)
        # Return the file with appropriate content type
        content_type = case File.extname(full_path)
                       when '.js'
                         'application/javascript'
                       when '.css'
                         'text/css'
                       else
                         'text/plain'
                       end
        
        send_file full_path, type: content_type, disposition: 'inline'
        return
      end
    end
    
    # Handle case when file not found
    render plain: "File not found", status: 404
  end
end 