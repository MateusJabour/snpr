class SnpsController < ApplicationController
  helper_method :sort_column, :sort_direction
  before_filter :find_snp, :except => [:index]
    
	def index
		@snps = Snp.order(sort_column + " "+ sort_direction)
		@snps_paginate = @snps.paginate(:page => params[:page],:per_page => 10)

		respond_to do |format|
			format.html
			format.xml 
		end
	end
	
	def show
		@snp = Snp.find_by_name(params[:id].downcase)
		@title = @snp.name
		@comments = SnpComment.where(:snp_id => @snp.id).all(:order => "created_at ASC")
		@users = User.find(:all, :conditions => { :user_snp => { :snps => { :id => @snp.id }}}, :joins => [ :user_snps => :snp])
		#@user_snps = UserSnps.where(:snp_name => @snp.name)
		
		if current_user != nil
		  @user_snp = UserSnp.find_by_user_id_and_snp_name(current_user,@snp.name)
		  if @user_snp != nil
		    @local_genotype = @user_snp.local_genotype
	    else
	      @local_genotype = ""
      end
	  end
	  
		@total_genotypes = 0
		
		@snp.genotype_frequency.each do |key,value|
		  @total_genotypes += value
		end
    
		@total_alleles = 0
		@snp.allele_frequency.each do |key,value|
		  @total_alleles += value
		end
		
		Resque.enqueue(Plos,@snp.id)
		Resque.enqueue(Mendeley,@snp.id)
		Resque.enqueue(Snpedia,@snp.id)
		  
	    @snp_comment = SnpComment.new
			  
		respond_to do |format|
			format.html
			format.xml
		end
	end
		
		private
		
		def sort_column
			Snp.column_names.include?(params[:sort]) ? params[:sort] : "ranking"
	  end
	  
	  def sort_direction
		%w[asc desc].include?(params[:direction]) ? params[:direction] : "desc"
	  end


    def find_snp
      @snp = Snp.find(params[:id].downcase)

      # If an old id or a numeric id was used to find the record, then
      # the request path will not match the post_path, and we should do
      # a 301 redirect that uses the current friendly id.
      if request.path != snp_path(@snp)
        return redirect_to @snp, :status => :moved_permanently
      end
    end

	end
