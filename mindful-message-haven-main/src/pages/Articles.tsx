
import AppLayout from "@/components/layout/AppLayout";
import { ArticleCard } from "@/components/ui/article-card";
import {pcos} from "../assets/images/index.js"
export default function Articles() {
  const articles = [
    {
      category: "Reproductive Health",
      title: "Understanding PCOS: Symptoms, Causes, and Management",
      summary: "Polycystic Ovary Syndrome affects millions of women worldwide. Learn about the symptoms, causes, and effective management strategies.",
      author: {
        name: "Priya Sharma",
        title: "Gynecologist"
      },
      date: "April 5, 2023",
      readTime: "8 min read",
      image: "data:image/jpeg;base64,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"
    },
    {
      category: "Menstrual Health",
      title: "The Connection Between Stress and Your Menstrual Cycle",
      summary: "Stress can significantly impact your menstrual cycle. Discover the science behind this connection and strategies to maintain hormonal balance.",
      author: {
        name: "Meera Kapoor",
        title: "Endocrinologist"
      },
      date: "March 22, 2023",
      readTime: "6 min read",
      image:"data:image/jpeg;base64,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"
    },
    {
      category: "Cancer Awareness",
      title: "Breast Self-Examination: A Step-by-Step Guide",
      summary: "Regular breast self-examinations are crucial for early detection of breast cancer. Learn the proper technique with this comprehensive guide.",
      author: {
        name: "Anjali Rao",
        title: "Oncologist"
      },
      date: "April 1, 2023",
      readTime: "5 min read"
    },
    {
      category: "Nutrition",
      title: "Anti-Inflammatory Foods for Women's Health",
      summary: "Discover how incorporating anti-inflammatory foods into your diet can help manage conditions like PCOS, endometriosis, and menstrual pain.",
      author: {
        name: "Divya Patel",
        title: "Nutritionist"
      },
      date: "May 10, 2023",
      readTime: "7 min read"
    },
    {
      category: "Mental Health",
      title: "Managing Anxiety During Hormonal Fluctuations",
      summary: "Hormonal changes throughout the month can significantly impact anxiety levels. Learn effective strategies to manage anxiety during these fluctuations.",
      author: {
        name: "Shalini Kumar",
        title: "Psychiatrist"
      },
      date: "June 3, 2023",
      readTime: "9 min read"
    },
    {
      category: "Self-Defense",
      title: "Essential Self-Defense Moves Every Woman Should Know",
      summary: "Empower yourself with these practical self-defense techniques designed specifically for women's safety and confidence.",
      author: {
        name: "Neha Singh",
        title: "Self-Defense Instructor"
      },
      date: "May 25, 2023",
      readTime: "6 min read"
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Expert Health Articles</h1>
          <p className="text-xl text-muted-foreground">
            Reliable information written by healthcare professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 staggered">
          {articles.map((article, i) => (
            <ArticleCard
              key={i}
              category={article.category}
              title={article.title}
              summary={article.summary}
              author={article.author}
              date={article.date}
              readTime={article.readTime}
              imageSrc={article.image}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
