import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { newsArticles } from "@/utils/newsData";
import { ScrollArea } from "@/components/ui/scroll-area";
export const NewsDetailContent: React.FC = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const article = newsArticles.find(article => article.slug === slug);

  // Related articles based on the same category, excluding the current article
  const relatedArticles = article ? newsArticles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3) : [];
  if (!article) {
    return <div className="bg-white dark:bg-gray-800 flex flex-col items-center justify-center p-6 h-full">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Article Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/news">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Link>
        </Button>
      </div>;
  }

  // Format the article content by splitting paragraphs
  const formattedContent = article.content.split('\n\n').map((paragraph, index) => <p key={index} className="mb-6">{paragraph}</p>);
  return <div className="bg-white dark:bg-gray-800 flex min-w-60 flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:p-4 max-md:max-w-full">
      <Button variant="outline" className="w-fit mb-6" asChild>
        <Link to="/news">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Link>
      </Button>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="h-[400px] max-h-[50vh] overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-6">
              <Badge variant="secondary" className="mb-4">
                {article.category}
              </Badge>
              
              <h1 className="text-3xl font-bold mb-4 dark:text-white">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{article.publishDate}</span>
                </div>
                <div className="flex items-center">
                  
                  
                </div>
                
              </div>
              
              <div className="prose dark:prose-invert prose-lg max-w-none">
                {formattedContent}
              </div>
            </div>
          </article>
        </div>
        
        <div className="lg:w-1/4">
          <div className="sticky top-6">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Related Articles</h3>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4 pr-4">
                {relatedArticles.map(relatedArticle => <Link to={`/news/${relatedArticle.slug}`} key={relatedArticle.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                      <div className="h-32 overflow-hidden">
                        <img src={relatedArticle.image} alt={relatedArticle.title} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-3">
                        <Badge variant="secondary" className="mb-1 text-xs">
                          {relatedArticle.category}
                        </Badge>
                        <h4 className="font-medium text-sm line-clamp-2 mb-1 dark:text-white">{relatedArticle.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{relatedArticle.publishDate}</p>
                      </CardContent>
                    </Card>
                  </Link>)}
                
                {relatedArticles.length === 0 && <p className="text-gray-500 dark:text-gray-400 text-sm">No related articles found.</p>}
                
                <Card className="overflow-hidden border-gray-200 dark:border-gray-700 dark:bg-gray-800 mt-6">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 dark:text-white">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(newsArticles.map(a => a.category))).map(category => <Link to={`/news?category=${category.toLowerCase()}`} key={category}>
                          <Badge variant="outline" className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            {category}
                          </Badge>
                        </Link>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>;
};