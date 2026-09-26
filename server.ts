import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory leads storage for interactive campaign lead capture
interface LeadRecord {
  id: string;
  campaignId: string;
  email: string;
  name: string;
  role?: string;
  tier?: string;
  submittedAt: string;
}
const capturedLeads: LeadRecord[] = [
  {
    id: 'lead-1',
    campaignId: 'ai-datascience-masterclass',
    email: 'sarah.lin@datacorp.io',
    name: 'Sarah Lin',
    role: 'Senior Data Analyst',
    tier: 'Early Bird Professional',
    submittedAt: '12 minutes ago'
  },
  {
    id: 'lead-2',
    campaignId: 'ai-datascience-masterclass',
    email: 'marcus.vance@techscale.com',
    name: 'Marcus Vance',
    role: 'Software Engineer (Backend)',
    tier: 'Early Bird Professional',
    submittedAt: '43 minutes ago'
  },
  {
    id: 'lead-3',
    campaignId: 'ai-datascience-masterclass',
    email: 'a.patel@quantedge.ai',
    name: 'Ananya Patel',
    role: 'ML Ops Intern',
    tier: 'Career Switcher Edition',
    submittedAt: '2 hours ago'
  }
];

// Initialize Gemini SDK with User-Agent telemetry as mandated by guidelines
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Fallback high-fidelity landing page generator if API key is absent or offline
function generateFallbackLandingPage(payload: any) {
  const isAiDataScience =
    !payload.campaignName ||
    payload.campaignName.toLowerCase().includes('ai') ||
    payload.campaignName.toLowerCase().includes('data science') ||
    payload.campaignName.toLowerCase().includes('machine learning');

  if (isAiDataScience) {
    return {
      campaignId: 'ai-datascience-masterclass',
      campaignName: payload.campaignName || 'AI & Data Science Production Masterclass',
      brandTone: payload.brandTone || 'authoritative_tech',
      targetAudience: payload.targetAudience || 'Software Engineers, Data Analysts & Technical Leaders',
      hero: {
        tagKicker: 'Comprehensive Professional Cohort · Fall 2026',
        headline: 'Master Real-World Generative AI, Computer Vision & Deep Learning Systems',
        subheadline: 'From PyTorch and Transformers to YOLO, LangChain RAG, and production MLOps. Build deployable AI pipelines with 1-on-1 industry mentorship.',
        primaryCtaText: 'Reserve Early-Bird Access',
        secondaryCtaText: 'Review Full 8-Week Syllabus',
        urgencyBadge: 'First 50 Registrants Receive $400 Cloud GPU Credits',
        valuePropBullets: [
          'Production-grade code: Python, PyTorch, Transformers & YOLOv8',
          'End-to-end RAG architecture with LangChain & Vector Databases',
          'Direct weekly feedback from Principal AI Practitioners',
          'Accredited portfolio deliverables with live model deployments'
        ],
        heroImage: '/src/assets/images/hero_ai_datascience_campaign_1790412632276.jpg'
      },
      metrics: [
        { value: '8 Weeks', label: 'Intensive Track', context: 'Hands-on project deliverables every 7 days' },
        { value: '14+ Models', label: 'Trained & Deployed', context: 'From YOLO to custom Transformer fine-tuning' },
        { value: '94.2%', label: 'Alumni Placement', context: 'Advanced to Senior ML / GenAI engineering roles' },
        { value: '1-on-1', label: 'Mentor Code Reviews', context: 'Weekly feedback on architecture & accuracy' }
      ],
      features: [
        {
          id: 'feat-1',
          category: 'Core Engineering',
          title: 'Python & Foundational ML Pipelines',
          description: 'Production-level Python programming with NumPy, Pandas, Scikit-learn, and statistical inference on real-world datasets.',
          outcomes: ['Clean modularized ML pipelines', 'Feature engineering at scale', 'Cross-validation benchmarks'],
          techStack: ['Python 3.12', 'Pandas', 'Scikit-learn', 'MLflow']
        },
        {
          id: 'feat-2',
          category: 'Generative AI',
          title: 'Generative AI, RAG & Agentic Systems',
          description: 'Build enterprise retrieval-augmented generation (RAG) pipelines, semantic embeddings, and multi-step tool agents using LangChain.',
          outcomes: ['Hybrid BM25 + Vector retrieval', 'Agentic tool invocation', 'Prompt evaluation frameworks'],
          techStack: ['LangChain', 'ChromaDB', 'Gemini Models', 'FastAPI']
        },
        {
          id: 'feat-3',
          category: 'Computer Vision',
          title: 'Computer Vision with OpenCV & YOLO',
          description: 'Real-time object detection, image segmentation, tracking pipelines, and edge inference optimization.',
          outcomes: ['Custom dataset annotation & fine-tuning', 'Sub-30ms real-time video analytics', 'Edge TensorRT export'],
          techStack: ['YOLOv8/v11', 'OpenCV', 'PyTorch', 'ONNX']
        },
        {
          id: 'feat-4',
          category: 'Natural Language Processing',
          title: 'NLP & Modern Transformer Architectures',
          description: 'Fine-tune modern Transformer foundations, attention mechanism inspection, tokenization strategies, and LLM alignment.',
          outcomes: ['LoRA & QLoRA parameter-efficient tuning', 'Instruction tuning workflows', 'BLEU/ROUGE evaluation'],
          techStack: ['Hugging Face', 'Transformers', 'PEFT', 'Datasets']
        },
        {
          id: 'feat-5',
          category: 'Deep Learning',
          title: 'Deep Learning with PyTorch & TensorFlow',
          description: 'Design, train, and debug convolutional, recurrent, and residual architectures with gradient checkpointing and multi-GPU acceleration.',
          outcomes: ['Loss landscape debugging', 'Mixed-precision FP16 training', 'Production model export'],
          techStack: ['PyTorch 2.4', 'TensorFlow', 'CUDA', 'Weights & Biases']
        },
        {
          id: 'feat-6',
          category: 'Industry Mentorship',
          title: 'Expert Feedback from AI Professionals',
          description: 'Every assignment and capstone is thoroughly critiqued by experienced staff AI engineers and research scientists.',
          outcomes: ['Code readability and safety audits', 'System design interview prep', 'Resume & portfolio critique'],
          techStack: ['GitHub Reviews', '1-on-1 Office Hours', 'Capstone Defense']
        }
      ],
      curriculum: [
        {
          module: 'Module 01',
          title: 'Modern Python for AI & High-Throughput Data Wrangling',
          duration: 'Week 1',
          topics: ['Vectorized operations with NumPy', 'High-cardinality data processing with Polars & Pandas', 'Data visualization and statistical rigor'],
          projectOutcome: 'Automated data validation pipeline with automated EDA reports'
        },
        {
          module: 'Module 02',
          title: 'Supervised & Unsupervised Machine Learning in Production',
          duration: 'Week 2',
          topics: ['Gradient Boosting (XGBoost/LightGBM)', 'Dimensionality reduction & PCA', 'Hyperparameter tuning & Bayesian optimization'],
          projectOutcome: 'Predictive churn and lead scoring engine with API endpoints'
        },
        {
          module: 'Module 03',
          title: 'Deep Learning Foundations: PyTorch & Neural Mechanics',
          duration: 'Week 3',
          topics: ['Tensors, autograd, and custom loss functions', 'Convolutional and recurrent networks', 'Optimization (AdamW, LR scheduling, Regularization)'],
          projectOutcome: 'Custom neural classifier trained on multi-spectral imagery'
        },
        {
          module: 'Module 04',
          title: 'Computer Vision: Real-time Object Detection with OpenCV & YOLO',
          duration: 'Week 4',
          topics: ['Image filtering & contours in OpenCV', 'YOLO architecture & anchor-free heads', 'Real-time video inference and bounding box tracking'],
          projectOutcome: 'Live stream safety inspection monitor running at 45 FPS'
        },
        {
          module: 'Module 05',
          title: 'NLP & Transformers: Attention Mechanisms and HuggingFace',
          duration: 'Week 5',
          topics: ['Self-attention & positional embeddings', 'Hugging Face pipelines & tokenizers', 'Sequence classification and Named Entity Recognition (NER)'],
          projectOutcome: 'Domain-specific regulatory contract parser and entity extractor'
        },
        {
          module: 'Module 06',
          title: 'Generative AI: RAG, Embeddings & Vector Databases',
          duration: 'Week 6',
          topics: ['Dense embeddings & similarity metrics', 'Hierarchical chunking strategies', 'Hybrid search & reranking models (Cohere/Cross-encoders)'],
          projectOutcome: 'Production enterprise documentation assistant with zero hallucinations'
        },
        {
          module: 'Module 07',
          title: 'Autonomous Agents, Tool Calling & LangChain Systems',
          duration: 'Week 7',
          topics: ['ReAct reasoning loops', 'Function declarations & external API execution', 'Stateful graph workflows with error recovery'],
          projectOutcome: 'Autonomous SQL analyst agent capable of running verified queries'
        },
        {
          module: 'Module 08',
          title: 'Capstone Deployment, MLOps & Industry Portfolio Defense',
          duration: 'Week 8',
          topics: ['Containerization with Docker', 'Model serving via FastAPI & Triton', 'Monitoring data drift and 1-on-1 expert capstone review'],
          projectOutcome: 'Fully deployed AI application with public demo & documentation'
        }
      ],
      socialProof: [
        {
          quote: 'The emphasis on writing production PyTorch rather than toy notebook scripts completely transformed my confidence. I transitioned to Senior AI Engineer within 3 months.',
          author: 'David K.',
          role: 'Senior AI Engineer',
          company: 'Vertex Systems',
          outcomeMetric: '+45% Compensation Increase'
        },
        {
          quote: 'Having real AI practitioners review my RAG architecture caught race conditions and vector search bottlenecks I would have never spotted alone.',
          author: 'Elena Rostova',
          role: 'Lead ML Engineer',
          company: 'FinMetric Analytics',
          outcomeMetric: 'Scaled to 2.4M queries/day'
        },
        {
          quote: 'From YOLO object detection to LangChain agents, the curriculum is updated for right now. The best investment I have made in my engineering career.',
          author: 'Tariq Al-Mansoor',
          role: 'Computer Vision Specialist',
          company: 'AeroAutonomous',
          outcomeMetric: 'Shipped 3 production models'
        }
      ],
      pricingTiers: [
        {
          name: 'Professional Track',
          price: '$1,450',
          originalPrice: '$1,950',
          period: 'One-time or 3x $520/mo',
          badge: 'Most Popular',
          popular: true,
          highlights: [
            'All 8 technical modules & project codebases',
            'Weekly 1-on-1 mentor code reviews & debugging',
            '$400 dedicated cloud GPU training credits',
            'Lifetime curriculum updates & private Discord channel',
            'Accredited AI & Data Science Certificate of Completion'
          ],
          ctaLabel: 'Claim Early Bird Spot'
        },
        {
          name: 'Executive & Team Pass',
          price: '$2,800',
          originalPrice: '$3,400',
          period: 'Per seat · Volume discounts available',
          badge: 'Enterprise Grade',
          popular: false,
          highlights: [
            'Includes everything in Professional Track',
            'Custom enterprise capstone project consultation',
            'Private team office hours with Lead Architect',
            'Executive system design & MLOps roadmap review',
            'Direct talent introduction and hiring showcase'
          ],
          ctaLabel: 'Inquire for Teams'
        }
      ],
      faq: [
        {
          question: 'What mathematical or programming background is expected?',
          answer: 'Intermediate familiarity with Python (functions, classes, basic data structures) and college-level linear algebra/calculus fundamentals. No prior deep learning experience is required; we build from ground truths to advanced architectures.'
        },
        {
          question: 'How much weekly time commitment is required?',
          answer: 'We recommend 8 to 12 hours weekly, divided between lecture concepts, live mentor labs, and hands-on coding challenges.'
        },
        {
          question: 'Do I need expensive local GPUs?',
          answer: 'No. All enrolled students receive cloud GPU credits and pre-configured remote environments (CUDA-enabled containers) so you can run training without purchasing local hardware.'
        },
        {
          question: 'Is there a money-back satisfaction guarantee?',
          answer: 'Yes. If you complete the first 14 days and feel the depth does not meet your standards, we offer a 100% no-questions-asked refund.'
        }
      ],
      conversionModule: {
        headline: 'Secure Priority Enrollment Before the Fall Cohort Caps',
        subtitle: 'Cohort size is strictly capped at 40 engineers to guarantee high-touch 1-on-1 feedback.',
        incentiveText: 'Enroll today to lock in early-bird pricing and instant access to the Pre-Course Python Math Toolkit.',
        fields: ['name', 'email', 'role'],
        buttonText: 'Reserve Priority Access Now',
        guaranteeText: '14-Day 100% Risk-Free Refund Guarantee · Zero Spam Policy'
      },
      abVariations: {
        variantHeadlineB: 'Become an AI & Data Science Engineer Who Ships Production Code, Not Just Notebooks',
        variantHookB: 'Master the high-demand stack: PyTorch, Transformers, YOLO, LangChain RAG & Real-World Datasets with weekly 1-on-1 mentor critiques.',
        variantCtaB: 'Apply for Fall 2026 Cohort',
        hypothesis: 'Shifting the value proposition from general learning to pragmatic production deployment increases senior engineer conversion by 18-24%.'
      },
      conversionAudit: {
        score: 93,
        predictedConversionRate: '6.4% - 8.2%',
        strengths: [
          'Immediate claim-to-proof alignment with quantifiable alumni outcomes',
          'Explicit tech stack transparency builds high technical trust',
          'Low-friction single-stage lead capture with tangible early bird bonus'
        ],
        optimizationOpportunities: [
          'Add animated syllabus preview tabs for progressive disclosure',
          'Include real-time remaining seat counter for authentic urgency'
        ]
      }
    };
  }

  // Generic fallback for any other marketing campaign
  return {
    campaignId: 'marketing-campaign-' + Date.now(),
    campaignName: payload.campaignName || 'Performance Growth Launch',
    brandTone: payload.brandTone || 'growth_dynamic',
    targetAudience: payload.targetAudience || 'Modern Teams & Operators',
    hero: {
      tagKicker: 'Next-Generation Marketing Campaign',
      headline: payload.headline || 'Accelerate Your Pipeline With Intelligent Automation',
      subheadline: payload.subheadline || 'Replace fragmented tools with an end-to-end campaign infrastructure built for measurable conversion velocity.',
      primaryCtaText: 'Start 14-Day Free Access',
      secondaryCtaText: 'Schedule Live Walkthrough',
      urgencyBadge: 'Exclusive Launch Pricing Available for the Next 72 Hours',
      valuePropBullets: [
        'Measurable conversion uplift verified across 500+ campaigns',
        'Instant setup with zero complex engineering overhead',
        'Transparent reporting without vanity metric noise',
        'Dedicated onboarding strategist assigned on Day 1'
      ],
      heroImage: '/src/assets/images/hero_growth_marketing_office_1790412645581.jpg'
    },
    metrics: [
      { value: '3.4x', label: 'Average Pipeline Velocity', context: 'Across 45 B2B implementations' },
      { value: '41%', label: 'Lower Cost per Acquisition', context: 'Benchmarked against industry standards' },
      { value: '15 min', label: 'Time to First Campaign', context: 'Pre-built high-converting templates' },
      { value: '99.9%', label: 'Infrastructure Reliability', context: 'Zero dropped inbound leads' }
    ],
    features: [
      {
        id: 'f-1',
        category: 'Intelligence',
        title: 'Algorithmic Copy & Headline Testing',
        description: 'Continuously benchmark variant headlines, value propositions, and calls to action against live audience engagement signals.',
        outcomes: ['Automated multi-armed bandit routing', 'Sentiment & readability optimization', 'Audience persona segmenting']
      },
      {
        id: 'f-2',
        category: 'Performance',
        title: 'Zero-Latency Edge Page Delivery',
        description: 'Static edge distribution guarantees sub-second first contentful paint worldwide, preventing bounce rates from sluggish load times.',
        outcomes: ['Global CDN deployment', 'Core Web Vitals 99+ score', 'Mobile responsive rendering']
      },
      {
        id: 'f-3',
        category: 'Conversion',
        title: 'Frictionless Inbound Lead Capture',
        description: 'Multi-step smart forms with progressive profiling and instant CRM webhook synchronization.',
        outcomes: ['Verified email syntax checks', 'Enriched company firmographics', 'Automated calendar booking integration']
      }
    ],
    curriculum: [],
    socialProof: [
      {
        quote: 'Our landing page conversion jumped from 2.1% to 6.8% in less than two weeks. The qualitative feedback on our value proposition was invaluable.',
        author: 'Julian Mercer',
        role: 'VP of Growth',
        company: 'HyperScale Cloud',
        outcomeMetric: '+224% Inbound SQLs'
      },
      {
        quote: 'Finally, an engine that respects technical integrity while delivering compelling marketing velocity. It eliminated weeks of back-and-forth design debates.',
        author: 'Sophia Chen',
        role: 'Product Marketing Director',
        company: 'Nexus Data',
        outcomeMetric: '$1.8M New ARR'
      }
    ],
    pricingTiers: [
      {
        name: 'Growth Edition',
        price: '$149',
        period: '/month billed annually',
        badge: 'Recommended',
        popular: true,
        highlights: [
          'Up to 10 active campaign landing pages',
          'Full A/B variant experimentation engine',
          'Instant lead export & webhook routing',
          'Real-time conversion heuristic audits',
          'Standard email & Slack support'
        ],
        ctaLabel: 'Launch Growth Campaign'
      }
    ],
    faq: [
      {
        question: 'Can I connect custom domains?',
        answer: 'Yes, custom domains with automated SSL provisioning are supported on all plans.'
      },
      {
        question: 'How does the A/B testing engine work?',
        answer: 'Traffic is automatically partitioned between variant hooks and layouts, with real-time conversion confidence scoring.'
      }
    ],
    conversionModule: {
      headline: 'Transform Your Next Campaign into a High-Converting Engine',
      subtitle: 'Join hundreds of marketing and product teams who launch faster with validated landing pages.',
      incentiveText: 'Create your first campaign in minutes with full access to all optimization modules.',
      fields: ['name', 'email'],
      buttonText: 'Get Started Today',
      guaranteeText: 'No credit card required to start · 14-day evaluation period'
    },
    abVariations: {
      variantHeadlineB: 'The Precision Landing Page Engine Built for Serious Growth Teams',
      variantHookB: 'Generate, optimize, and publish campaign pages with proven conversion mechanics in minutes.',
      variantCtaB: 'Start Free Trial',
      hypothesis: 'Focusing on execution speed and team efficiency appeals to time-strapped marketing leaders.'
    },
    conversionAudit: {
      score: 91,
      predictedConversionRate: '5.2% - 7.1%',
      strengths: ['Clear three-tier narrative progression', 'Zero fluff copy with clear value proposition'],
      optimizationOpportunities: ['Add interactive ROI estimator']
    }
  };
}

// API: Generate Landing Page via Gemini 3.8 Flash
app.post('/api/generate-page', async (req: Request, res: Response) => {
  try {
    const { campaignName, campaignType, targetAudience, keyOffers, brandTone, conversionGoal, customInstructions } = req.body;

    if (!ai) {
      console.log('Gemini API key not configured, returning curated fallback');
      const fallback = generateFallbackLandingPage(req.body);
      return res.json({ success: true, data: fallback, isFallback: true });
    }

    const systemInstruction = `You are a world-class conversion rate optimization (CRO) director and executive marketing copywriter.
You generate high-converting, deeply persuasive, professional landing page architecture for marketing campaigns.
Rules:
1. Avoid generic fluff, buzzword slop (never use "supercharge", "unleash", "elevate", "synergy"). Use concrete, quantifiable, benefit-rich claims.
2. If the user is promoting an AI, Machine Learning, or Data Science program/bootcamp, incorporate specific technical details: Python, NumPy, Pandas, Scikit-learn, Machine Learning algorithms, Generative AI (LLMs, RAG, LangChain), Computer Vision (OpenCV, YOLO), Natural Language Processing (Transformers), Deep Learning (TensorFlow, PyTorch), and expert feedback from senior AI professionals.
3. Include realistic social proof with verifiable metrics (e.g. "+140% Qualified Inbound Leads", "45 FPS sub-30ms inference", "+45% compensation uplift").
4. Include an A/B variation with a clear conversion hypothesis.
5. Provide a realistic conversion audit with score (80-98) and actionable strengths/opportunities.
Output ONLY strict JSON matching the requested schema.`;

    const prompt = `Generate a complete high-converting landing page for the following marketing campaign:
Campaign Name: ${campaignName || 'AI & Data Science Production Masterclass'}
Campaign Archetype: ${campaignType || 'bootcamp'}
Target Audience: ${targetAudience || 'Engineers, Analysts, and Growth Leaders'}
Core Focus / Deliverables: ${keyOffers ? JSON.stringify(keyOffers) : 'Python, ML, GenAI RAG, OpenCV YOLO, Transformers NLP, Deep Learning PyTorch, Expert feedback'}
Brand Tone: ${brandTone || 'authoritative_tech'}
Conversion Goal: ${conversionGoal || 'priority_waitlist'}
Additional Guidance: ${customInstructions || 'Focus on real-world practical outcomes and rigorous technical depth'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            campaignId: { type: Type.STRING },
            campaignName: { type: Type.STRING },
            brandTone: { type: Type.STRING },
            targetAudience: { type: Type.STRING },
            hero: {
              type: Type.OBJECT,
              properties: {
                tagKicker: { type: Type.STRING },
                headline: { type: Type.STRING },
                subheadline: { type: Type.STRING },
                primaryCtaText: { type: Type.STRING },
                secondaryCtaText: { type: Type.STRING },
                urgencyBadge: { type: Type.STRING },
                valuePropBullets: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['tagKicker', 'headline', 'subheadline', 'primaryCtaText', 'valuePropBullets']
            },
            metrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  value: { type: Type.STRING },
                  label: { type: Type.STRING },
                  context: { type: Type.STRING }
                },
                required: ['value', 'label', 'context']
              }
            },
            features: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  category: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  outcomes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  techStack: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ['id', 'category', 'title', 'description', 'outcomes']
              }
            },
            curriculum: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  module: { type: Type.STRING },
                  title: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  topics: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  projectOutcome: { type: Type.STRING }
                },
                required: ['module', 'title', 'duration', 'topics', 'projectOutcome']
              }
            },
            socialProof: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  quote: { type: Type.STRING },
                  author: { type: Type.STRING },
                  role: { type: Type.STRING },
                  company: { type: Type.STRING },
                  outcomeMetric: { type: Type.STRING }
                },
                required: ['quote', 'author', 'role', 'company', 'outcomeMetric']
              }
            },
            pricingTiers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  price: { type: Type.STRING },
                  originalPrice: { type: Type.STRING },
                  period: { type: Type.STRING },
                  badge: { type: Type.STRING },
                  popular: { type: Type.BOOLEAN },
                  highlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  ctaLabel: { type: Type.STRING }
                },
                required: ['name', 'price', 'highlights', 'ctaLabel']
              }
            },
            faq: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING }
                },
                required: ['question', 'answer']
              }
            },
            conversionModule: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                incentiveText: { type: Type.STRING },
                fields: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                buttonText: { type: Type.STRING },
                guaranteeText: { type: Type.STRING }
              },
              required: ['headline', 'subtitle', 'incentiveText', 'buttonText', 'guaranteeText']
            },
            abVariations: {
              type: Type.OBJECT,
              properties: {
                variantHeadlineB: { type: Type.STRING },
                variantHookB: { type: Type.STRING },
                variantCtaB: { type: Type.STRING },
                hypothesis: { type: Type.STRING }
              },
              required: ['variantHeadlineB', 'variantHookB', 'variantCtaB', 'hypothesis']
            },
            conversionAudit: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.NUMBER },
                predictedConversionRate: { type: Type.STRING },
                strengths: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                optimizationOpportunities: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['score', 'predictedConversionRate', 'strengths', 'optimizationOpportunities']
            }
          },
          required: [
            'campaignName',
            'hero',
            'metrics',
            'features',
            'socialProof',
            'pricingTiers',
            'faq',
            'conversionModule',
            'abVariations',
            'conversionAudit'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    
    // Attach default hero image if none provided
    if (!parsed.hero.heroImage) {
      parsed.hero.heroImage = '/src/assets/images/hero_ai_datascience_campaign_1790412632276.jpg';
    }

    return res.json({ success: true, data: parsed, isFallback: false });
  } catch (error: any) {
    console.error('Error generating landing page with Gemini:', error);
    // Provide resilient fallback so the user always has a high-converting result
    const fallback = generateFallbackLandingPage(req.body);
    return res.json({
      success: true,
      data: fallback,
      isFallback: true,
      errorNotice: error.message
    });
  }
});

// API: Quick AI Rewrite / Optimizer for specific landing page element
app.post('/api/optimize-element', async (req: Request, res: Response) => {
  try {
    const { element, currentText, direction, audience } = req.body;

    if (!ai) {
      return res.json({
        success: true,
        variants: [
          `Master High-Yield Production Systems with Verified Industry Benchmarks`,
          `The No-Fluff Engineering Curriculum Built for Modern ML Practitioners`,
          `Deploy Enterprise-Grade AI Models with 1-on-1 Senior Staff Guidance`
        ]
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are an elite conversion copywriter.
Rewrite the following landing page element: "${element}".
Current text: "${currentText}"
Target Direction: "${direction || 'higher urgency and concrete technical value'}"
Target Audience: "${audience || 'Engineers and Technical Decision Makers'}"

Return JSON array with 3 distinct high-converting alternatives:
["Option 1", "Option 2", "Option 3"]`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const variants = JSON.parse(response.text || '[]');
    return res.json({ success: true, variants });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// API: Lead Capture for the generated landing page
app.post('/api/lead-capture', (req: Request, res: Response) => {
  const { campaignId, email, name, role, tier } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  const newLead: LeadRecord = {
    id: `lead-${Date.now()}`,
    campaignId: campaignId || 'default-campaign',
    email: email.trim(),
    name: (name || 'Anonymous Applicant').trim(),
    role: role || 'Practitioner',
    tier: tier || 'Standard Tier',
    submittedAt: 'Just now'
  };

  capturedLeads.unshift(newLead);

  return res.json({
    success: true,
    message: 'Priority reservation confirmed! Check your inbox for the onboarding dossier.',
    lead: newLead,
    totalLeads: capturedLeads.length
  });
});

// API: Retrieve Captured Leads
app.get('/api/leads', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    leads: capturedLeads,
    total: capturedLeads.length
  });
});

// Production static file serving or Vite Dev Server setup
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
