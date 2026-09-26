import { LandingPageData } from '../types/landingPage';

export const AI_DATASCIENCE_CAMPAIGN: LandingPageData = {
  campaignId: 'ai-datascience-masterclass',
  campaignName: 'AI & Data Science Engineering Masterclass',
  brandTone: 'authoritative_tech',
  targetAudience: 'Software Engineers, Data Analysts & Technical Practitioners',
  hero: {
    tagKicker: 'Comprehensive Professional Cohort · Fall 2026',
    headline: 'Master Real-World Generative AI, Computer Vision & Deep Learning Systems',
    subheadline: 'From PyTorch and Transformers to YOLO, LangChain RAG, and production MLOps. Build deployable AI pipelines with direct 1-on-1 industry mentorship.',
    primaryCtaText: 'Reserve Priority Cohort Seat',
    secondaryCtaText: 'Download 8-Week Syllabus',
    urgencyBadge: 'First 50 Registrants Receive $400 Cloud GPU Credits',
    valuePropBullets: [
      'Production-grade code: Python, PyTorch, Transformers & YOLOv8',
      'End-to-end RAG architecture with LangChain & Vector Databases',
      'Direct weekly code critique from Principal AI Practitioners',
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
      category: 'Foundations',
      title: 'Python Programming with AI/ML Libraries',
      description: 'Production-level Python programming with NumPy, Pandas, Scikit-learn, and statistical inference on massive real-world datasets.',
      outcomes: ['Vectorized operations & memory optimization', 'Reproducible data pipelines', 'Model baseline validation'],
      techStack: ['Python 3.12', 'Pandas', 'NumPy', 'Scikit-learn']
    },
    {
      id: 'feat-2',
      category: 'Generative AI',
      title: 'Generative AI with LLMs, RAG, and LangChain',
      description: 'Architect enterprise retrieval-augmented generation (RAG) pipelines, dense embeddings, semantic search, and autonomous tool-calling agents.',
      outcomes: ['Hybrid BM25 + Vector retrieval', 'Agentic tool invocation loops', 'Prompt evaluation & guardrails'],
      techStack: ['LangChain', 'ChromaDB', 'Gemini Models', 'FastAPI']
    },
    {
      id: 'feat-3',
      category: 'Computer Vision',
      title: 'Computer Vision with OpenCV and YOLO',
      description: 'Real-time object detection, segmentation, multi-object tracking, and low-latency edge inference optimization.',
      outcomes: ['Custom dataset annotation & fine-tuning', 'Sub-30ms real-time video analytics', 'Edge TensorRT export'],
      techStack: ['YOLOv8/v11', 'OpenCV', 'PyTorch', 'ONNX Runtime']
    },
    {
      id: 'feat-4',
      category: 'Language Models',
      title: 'Natural Language Processing with Transformers',
      description: 'Deep dive into attention mechanisms, fine-tuning modern Transformer foundations with LoRA/QLoRA, and tokenization dynamics.',
      outcomes: ['Parameter-efficient fine-tuning (PEFT)', 'Context window management', 'Task-specific sequence modeling'],
      techStack: ['Hugging Face', 'Transformers', 'PEFT', 'Datasets']
    },
    {
      id: 'feat-5',
      category: 'Neural Networks',
      title: 'Deep Learning with TensorFlow and PyTorch',
      description: 'Design, train, and debug convolutional, recurrent, and residual architectures with gradient checkpointing and multi-GPU acceleration.',
      outcomes: ['Loss landscape debugging', 'Mixed-precision FP16 training', 'Production model serving'],
      techStack: ['PyTorch 2.4', 'TensorFlow', 'CUDA', 'Weights & Biases']
    },
    {
      id: 'feat-6',
      category: 'Mentorship',
      title: 'Expert Feedback from AI Professionals',
      description: 'Every assignment and capstone is thoroughly critiqued by experienced staff AI engineers and research scientists.',
      outcomes: ['Code readability and safety audits', 'System design interview preparation', 'Resume & portfolio critique'],
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
      title: 'NLP & Transformers: Attention Mechanisms and Hugging Face',
      duration: 'Week 5',
      topics: ['Self-attention & positional embeddings', 'Hugging Face pipelines & tokenizers', 'Sequence classification and Named Entity Recognition (NER)'],
      projectOutcome: 'Domain-specific regulatory contract parser and entity extractor'
    },
    {
      module: 'Module 06',
      title: 'Generative AI: RAG, Embeddings & Vector Databases',
      duration: 'Week 6',
      topics: ['Dense embeddings & similarity metrics', 'Hierarchical chunking strategies', 'Hybrid search & reranking models (Cross-encoders)'],
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
      name: 'Professional Cohort',
      price: '$1,450',
      originalPrice: '$1,950',
      period: 'One-time or 3x $520/mo',
      badge: 'Early Bird Rate',
      popular: true,
      highlights: [
        'All 8 technical modules & reproducible codebases',
        'Weekly 1-on-1 mentor code reviews & debugging',
        '$400 dedicated cloud GPU training credits',
        'Lifetime curriculum updates & private alumni Slack',
        'Verified AI & Data Science Certificate of Completion'
      ],
      ctaLabel: 'Claim Early Bird Spot'
    },
    {
      name: 'Team & Enterprise Pass',
      price: '$2,800',
      originalPrice: '$3,400',
      period: 'Per seat · Multi-seat invoicing available',
      badge: 'Enterprise Access',
      popular: false,
      highlights: [
        'Includes everything in Professional Cohort',
        'Custom enterprise capstone project consultation',
        'Private weekly team office hours with Staff Architect',
        'Executive MLOps architecture roadmap critique',
        'Dedicated team progress dashboard'
      ],
      ctaLabel: 'Request Enterprise Invoice'
    }
  ],
  faq: [
    {
      question: 'What programming or mathematics background is expected?',
      answer: 'Intermediate familiarity with Python (functions, object-oriented concepts, and basic data structures) and college-level linear algebra/calculus fundamentals. No prior deep learning experience is required; we build from ground truths to advanced architectures.'
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

export const SAAS_GROWTH_CAMPAIGN: LandingPageData = {
  campaignId: 'growth-pipeline-saas',
  campaignName: 'Autonomous Campaign Intelligence Platform',
  brandTone: 'growth_dynamic',
  targetAudience: 'Performance Marketers, Growth Engineers & Founders',
  hero: {
    tagKicker: 'AI-Native Campaign Optimization',
    headline: 'Double Your Inbound Pipeline with Heuristic Landing Page Automation',
    subheadline: 'Continuous copy iteration, real-time A/B bandits, and instant conversion diagnostics—designed for high-velocity marketing teams.',
    primaryCtaText: 'Start Free 14-Day Sandbox',
    secondaryCtaText: 'View Live Performance Metrics',
    urgencyBadge: 'Over 2,400 Campaigns Optimized This Month',
    valuePropBullets: [
      'Automated multi-armed bandit traffic routing',
      'Sub-second Edge page delivery across 310 global locations',
      'Predictive conversion heatmaps powered by frontier LLMs',
      'Instant CRM and webhook synchronization'
    ],
    heroImage: '/src/assets/images/hero_growth_marketing_office_1790412645581.jpg'
  },
  metrics: [
    { value: '3.4x', label: 'Average Pipeline Velocity', context: 'Measured across 45 B2B implementations' },
    { value: '41%', label: 'Lower Cost per Acquisition', context: 'Benchmarked against industry standards' },
    { value: '15 min', label: 'Time to First Live Campaign', context: 'Pre-built high-converting templates' },
    { value: '99.9%', label: 'Infrastructure Reliability', context: 'Zero dropped inbound leads' }
  ],
  features: [
    {
      id: 'g-1',
      category: 'Automation',
      title: 'Algorithmic Copy & Headline Generation',
      description: 'Continuously benchmark variant headlines, value propositions, and calls to action against live audience engagement signals.',
      outcomes: ['Automated multi-armed bandit routing', 'Readability optimization', 'Audience persona segmenting']
    },
    {
      id: 'g-2',
      category: 'Performance',
      title: 'Zero-Latency Edge Page Delivery',
      description: 'Static edge distribution guarantees sub-second first contentful paint worldwide, preventing bounce rates from sluggish load times.',
      outcomes: ['Global CDN deployment', 'Core Web Vitals 99+ score', 'Mobile responsive rendering']
    },
    {
      id: 'g-3',
      category: 'Conversion',
      title: 'Frictionless Inbound Lead Capture',
      description: 'Multi-step smart forms with progressive profiling and instant CRM webhook synchronization.',
      outcomes: ['Verified email syntax checks', 'Enriched company firmographics', 'Automated calendar booking integration']
    }
  ],
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
      originalPrice: '$199',
      period: '/month billed annually',
      badge: 'Popular',
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
