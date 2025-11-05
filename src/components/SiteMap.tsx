import React from 'react'
import { Link } from 'react-router-dom'

export interface SiteMapItem {
  title: string
  path: string
  description: string
  category: 'main' | 'feature' | 'teacher'
  lastModified: string
  priority: 'high' | 'medium' | 'low'
}

const siteMapData: SiteMapItem[] = [
  // Main Pages
  {
    title: 'Главная',
    path: '/',
    description: 'Логопедические услуги для детей и взрослых. Речь и Развитие.',
    category: 'main',
    lastModified: '2025-11-05',
    priority: 'high'
  },
  {
    title: 'Услуги',
    path: '/features',
    description: 'Полный спектр логопедических и педагогических услуг',
    category: 'main',
    lastModified: '2025-11-05',
    priority: 'high'
  },
  {
    title: 'Наши педагоги',
    path: '/teachers',
    description: 'Квалифицированные специалисты с многолетним опытом',
    category: 'main',
    lastModified: '2025-11-05',
    priority: 'high'
  },
  {
    title: 'Контакты',
    path: '/contact',
    description: 'Свяжитесь с нами для записи на консультацию',
    category: 'main',
    lastModified: '2025-11-05',
    priority: 'medium'
  },
  
  // Feature Pages
  {
    title: 'Услуги для детей',
    path: '/features/children',
    description: 'Логопедические услуги для детей дошкольного и школьного возраста',
    category: 'feature',
    lastModified: '2025-11-05',
    priority: 'high'
  },
  {
    title: 'Услуги для подростков',
    path: '/features/teenagers',
    description: 'Специализированные программы для подростков',
    category: 'feature',
    lastModified: '2025-11-05',
    priority: 'high'
  },
  {
    title: 'Услуги для взрослых',
    path: '/features/adults',
    description: 'Логопедическая помощь для взрослых',
    category: 'feature',
    lastModified: '2025-11-05',
    priority: 'high'
  },
  
  // Teacher Pages
  {
    title: 'Севостьянова Татьяна Петровна',
    path: '/teachers/sevostianova-tatiana',
    description: 'Логопед-дефектолог с 31-летним стажем в педагогике',
    category: 'teacher',
    lastModified: '2025-11-05',
    priority: 'medium'
  },
  {
    title: 'Горовая Оксана Александровна',
    path: '/teachers/gorovaya-oksana',
    description: 'Учитель начальных классов, репетитор по математике и русскому языку',
    category: 'teacher',
    lastModified: '2025-11-05',
    priority: 'medium'
  },
  {
    title: 'Ирина Александровна Петрова',
    path: '/teachers/petrovna-irina',
    description: 'Учитель начальных классов, репетитор по математике и русскому языку',
    category: 'teacher',
    lastModified: '2025-11-05',
    priority: 'medium'
  }
]

const getCategoryColor = (category: SiteMapItem['category']) => {
  switch (category) {
    case 'main': return 'bg-blue-100 text-blue-800'
    case 'feature': return 'bg-green-100 text-green-800'
    case 'teacher': return 'bg-purple-100 text-purple-800'
  }
}

const getPriorityColor = (priority: SiteMapItem['priority']) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'low': return 'bg-gray-100 text-gray-800'
  }
}

const getCategoryTitle = (category: SiteMapItem['category']) => {
  switch (category) {
    case 'main': return 'Основные страницы'
    case 'feature': return 'Услуги'
    case 'teacher': return 'Педагоги'
  }
}

export default function SiteMap() {
  const groupedData = siteMapData.reduce((groups, item) => {
    const group = groups[item.category] || []
    group.push(item)
    groups[item.category] = group
    return groups
  }, {} as Record<string, SiteMapItem[]>)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Карта сайта</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Полная структура нашего сайта логопедических услуг. 
          Найдите нужную информацию о наших услугах и специалистах.
        </p>
      </div>

      {Object.entries(groupedData).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(category as SiteMapItem['category'])}`}>
              {getCategoryTitle(category as SiteMapItem['category'])}
            </span>
            <span>({items.length})</span>
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.path}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <Link
                    to={item.path}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline flex-1 mr-2"
                  >
                    {item.title}
                  </Link>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getPriorityColor(item.priority)}`}>
                    {item.priority === 'high' ? 'Высокий' : item.priority === 'medium' ? 'Средний' : 'Низкий'}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Путь: <code className="bg-slate-100 px-1 rounded">{item.path}</code></span>
                  <span>Обновлено: {item.lastModified}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-16 p-8 bg-slate-50 rounded-lg">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">SEO и поисковая оптимизация</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-slate-900 mb-2">XML Sitemap</h3>
            <p className="text-slate-600 mb-3 text-sm">
              Машиночитаемая карта сайта для поисковых систем:
            </p>
            <code className="block bg-white p-3 rounded border text-sm">
              /sitemap.xml
            </code>
          </div>
          <div>
            <h3 className="font-medium text-slate-900 mb-2">Структура сайта</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• {siteMapData.filter(item => item.category === 'main').length} основных страниц</li>
              <li>• {siteMapData.filter(item => item.category === 'feature').length} страниц услуг</li>
              <li>• {siteMapData.filter(item => item.category === 'teacher').length} профилей педагогов</li>
              <li>• Всего: {siteMapData.length} страниц</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-4">
          XML-карта сайта автоматически генерируется и помогает поисковым системам 
          находить и индексировать все страницы нашего сайта.
        </p>
      </div>
    </div>
  )
}

export { siteMapData }